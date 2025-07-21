  import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
  import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js';
  import { player } from './player.js';
  import { object } from './object.js';
  import { math } from './math.js';

  export class GameStage3 {
    constructor() {
      this.Initialize();
      this.RAF();
    }

    Initialize() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      this.renderer.gammaFactor = 2.2;
      document.getElementById('container').appendChild(this.renderer.domElement);

      const fov = 60;
      const aspect = window.innerWidth / window.innerHeight;
      const near = 1.0;
      const far = 2000.0;
      this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      this.camera.position.set(-8, 6, 12);
      this.camera.lookAt(0, 2, 0);

      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x000000);

      // Procedural Star Background
      const starGeometry = new THREE.BufferGeometry();
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.5,
        sizeAttenuation: true,
      });

      const starVertices = [];
      for (let i = 0; i < 10000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        starVertices.push(x, y, z);
      }
      starGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(starVertices, 3)
      );

      const stars = new THREE.Points(starGeometry, starMaterial);
      this.scene.add(stars);

      this.SetupLighting();
      this.CreatePlayer();

      window.addEventListener('resize', () => this.OnWindowResize(), false);
    }

    SetupLighting() {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
      directionalLight.position.set(60, 100, 10);
      directionalLight.target.position.set(0, 0, 0);
      directionalLight.castShadow = true;
      directionalLight.shadow.bias = -0.001;
      directionalLight.shadow.mapSize.width = 2048;
      directionalLight.shadow.mapSize.height = 2048;
      directionalLight.shadow.camera.near = 1.0;
      directionalLight.shadow.camera.far = 200.0;
      directionalLight.shadow.camera.left = -50;
      directionalLight.shadow.camera.right = 50;
      directionalLight.shadow.camera.top = 50;
      directionalLight.shadow.camera.bottom = -50;
      this.scene.add(directionalLight);
      this.scene.add(directionalLight.target);

      const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0xf6f47f, 0.6);
      this.scene.add(hemisphereLight);
    }

    

    

    CreatePlayer() {
      this.nature_ = new object.NPC(this.scene);

      // Wait for the central object (Station) to be loaded and get its top Y position
      const checkStationLoaded = () => {
        const stationTopY = this.nature_.getCentralObjectTopY();
        if (stationTopY > 0) { // Assuming Station will be above Y=0
          this.player_ = new player.Player({
            scene: this.scene,
            onDebugToggle: (visible) => this.nature_.ToggleDebugVisuals(visible),
            initialY: stationTopY,
          });
          this.cameraTargetOffset = new THREE.Vector3(0, 15, 10);
          this.rotationAngle = 4.715;
        } else {
          setTimeout(checkStationLoaded, 100); // Retry after 100ms if not loaded yet
        }
      };
      checkStationLoaded();
    }

    UpdateCamera() {
      if (!this.player_ || !this.player_.mesh_) return;

      const target = this.player_.mesh_.position.clone();
      const offset = this.cameraTargetOffset.clone();
      offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotationAngle);
      const cameraPos = target.clone().add(offset);
      this.camera.position.copy(cameraPos);

      const headOffset = new THREE.Vector3(0, 2, 0);
      const headPosition = target.clone().add(headOffset);
      this.camera.lookAt(headPosition);
    }

    OnWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    RAF(time) {
      requestAnimationFrame((t) => this.RAF(t));

      if (!this.prevTime) this.prevTime = time || performance.now();
      const delta = ((time || performance.now()) - this.prevTime) * 0.001;
      this.prevTime = time || performance.now();

      if (this.player_ && this.nature_) {
        const collidables = this.nature_.GetCollidables();
        this.player_.Update(delta, this.rotationAngle, collidables);
        this.UpdateCamera();
      }

      if (this.nature_) {
        this.nature_.Update(delta);
      }

      this.renderer.render(this.scene, this.camera);
    }
  }