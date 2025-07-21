// object.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.124/build/three.module.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/loaders/MTLLoader.js';

export const object = (() => {
  class NatureObject {
    constructor(scene, params = {}) {
      this.scene_ = scene;
      this.models_ = [];
      this.collidables_ = []; // 충돌 대상 오브젝트 배열
      this.debugHelpers_ = []; // 디버그용 바운딩 볼륨 헬퍼 배열
      this.loadedModels_ = new Map(); // Map to store loaded models by filename
      this.LoadModels_();
    }

    LoadModels_() {
      const objLoader = new OBJLoader();
      const mtlLoader = new MTLLoader();
      objLoader.setPath('./resources/SpacePack/OBJ/');
      mtlLoader.setPath('./resources/SpacePack/OBJ/');

      const modelsToLoad = [
        {
          type: 'obj',
          filename: 'Station0.obj',
          mtlFilename: 'Station0.mtl',
          position: new THREE.Vector3(0, 0, 0),
          scale: 8,
          collidable: true,
          isCentral: true,
          ka: 0x020202, // Example ambient color (black)
          ks: 0x020202, // Example specular color (black)
          kd: 0x020202, // Example diffuse color (gray)
        },
        {
          type: 'obj',
          filename: 'Moon.obj',
          mtlFilename: 'Moon.mtl',
          scale: 5,
          collidable: true,
          boundingType: 'sphere',
          boundingRadius: 3,
          orbit: { radius: 15, speed:0.5 , angle: Math.random() * Math.PI * 2, height: 0 },
          ka: 0x050505, // Example ambient color
          ks: 0x101010, // Example specular color
          kd: 0x808080, // Example diffuse color
        },
        {
          type: 'obj',
          filename: 'Planet1.obj',
          mtlFilename: 'Planet1.mtl',
          scale: 2,
          collidable: true,
          boundingType: 'sphere',
          boundingRadius: 5,
          orbit: { radius: 20, speed:0.5 , angle: Math.random() * Math.PI * 2, height: 5 },
          ka: 0x000000,
          ks: 0x000000,
          kd: 0x00FF00, // Green planet
        },
        {
          type: 'obj',
          filename: 'Planet2.obj',
          mtlFilename: 'Planet2.mtl',
          scale: 2,
          collidable: true,
          boundingType: 'sphere',
          boundingRadius: 5,
          orbit: { radius: 25, speed:0.5 , angle: Math.random() * Math.PI * 2, height: 15 },
          ka: 0x000000,
          ks: 0x000000,
          kd: 0xFF0000, // Red planet
        },
        {
          type: 'obj',
          filename: 'Planet3.obj',
          mtlFilename: 'Planet3.mtl',
          scale: 2,
          collidable: true,
          boundingType: 'sphere',
          boundingRadius: 15,
          orbit: { radius: 30, speed:0.5 , angle: Math.random() * Math.PI * 2, height: 10 },
          ka: 0xff0000,
          ks: 0xff0000,
          kd: 0xff0000, // Blue planet
        },
        {
          type: 'obj',
          filename: 'SmallMoon.obj',
          mtlFilename: 'SmallMoon.mtl',
          scale: 2,
          collidable: true,
          boundingType: 'sphere',
          boundingRadius: 1.5,
          orbit: { radius: 10, speed:0.5 , angle: Math.random() * Math.PI * 2, height: 5 },
          ka: 0x000000,
          ks: 0x000000,
          kd: 0xFFFF00, // Yellow small moon
        },
        {
          type: 'obj',
          filename: 'SmallPlanet1.obj',
          mtlFilename: 'SmallPlanet1.mtl',
          scale: 2,
          collidable: true,
          boundingType: 'sphere',
          boundingRadius: 2,
          orbit: { radius: 18, speed:0.5 , angle: Math.random() * Math.PI * 2, height: -10 },
        },
        {
          type: 'obj',
          filename: 'Station1.obj',
          mtlFilename: 'Station1.mtl',
          position: new THREE.Vector3(50, 0, 0), // Station0과 겹치지 않도록 위치 조정
          scale: 8,
          collidable: true,
          isCentral: false,
          ka: 0x020202,
          ks: 0x020202,
          kd: 0x020202,
        },
        {
          type: 'obj',
          filename: 'Moon.obj',
          mtlFilename: 'Moon.mtl',
          scale: 5,
          collidable: true,
          boundingType: 'sphere',
          boundingRadius: 3,
          orbit: { radius: 15, speed:0.5 , angle: Math.random() * Math.PI * 2, height: 0 },
          ka: 0x050505, // Example ambient color
          ks: 0x101010, // Example specular color
          kd: 0x808080, // Example diffuse color
        },
        {
          type: 'obj',
          filename: 'Planet1.obj',
          mtlFilename: 'Planet1.mtl',
          scale: 2,
          collidable: true,
          boundingType: 'sphere',
          boundingRadius: 5,
          orbit: { radius: 20, speed:0.5 , angle: Math.random() * Math.PI * 2, height: 5 },
          ka: 0x000000,
          ks: 0x000000,
          kd: 0x00FF00, // Green planet
        },
        {
          type: 'obj',
          filename: 'Planet2.obj',
          mtlFilename: 'Planet2.mtl',
          scale: 2,
          collidable: true,
          boundingType: 'sphere',
          boundingRadius: 5,
          orbit: { radius: 25, speed:0.5 , angle: Math.random() * Math.PI * 2, height: 15 },
          ka: 0x000000,
          ks: 0x000000,
          kd: 0xFF0000, // Red planet
        },
        {
          type: 'obj',
          filename: 'Planet3.obj',
          mtlFilename: 'Planet3.mtl',
          scale: 2,
          collidable: true,
          boundingType: 'sphere',
          boundingRadius: 15,
          orbit: { radius: 30, speed:0.5 , angle: Math.random() * Math.PI * 2, height: 10 },
          ka: 0xff0000,
          ks: 0xff0000,
          kd: 0xff0000, // Blue planet
        },
        {
          type: 'obj',
          filename: 'SmallMoon.obj',
          mtlFilename: 'SmallMoon.mtl',
          scale: 2,
          collidable: true,
          boundingType: 'sphere',
          boundingRadius: 1.5,
          orbit: { radius: 10, speed:0.5 , angle: Math.random() * Math.PI * 2, height: 5 },
          ka: 0x000000,
          ks: 0x000000,
          kd: 0xFFFF00, // Yellow small moon
        },
        {
          type: 'obj',
          filename: 'SpaceShip.obj',
          mtlFilename: 'SpaceShip.mtl',
          scale: 2,
          collidable: true,
          boundingType: 'box',
          boundingBoxSize: { width: 10, height: 5, depth: 10 },
          orbit: { radius: 200, speed: 0.0002, angle: Math.random() * Math.PI * 2, height: 20 },
          ka: 0x000000,
          ks: 0x000000,
          kd: 0x800080, // Purple spaceship
        },
      ];

      modelsToLoad.forEach((modelInfo) => {
        mtlLoader.load(modelInfo.mtlFilename, (materials) => {
          materials.preload();
          objLoader.setMaterials(materials);
          objLoader.load(modelInfo.filename, (obj) => {
            this.OnModelLoaded_(obj, modelInfo);
          });
        });
      });
    }

    OnModelLoaded_(model, modelInfo) {
      model.scale.setScalar(modelInfo.scale);
      this.loadedModels_.set(modelInfo.filename, model); // Store the loaded model

      if (modelInfo.isCentral) {
        this.centralObject_ = model;
        model.position.copy(modelInfo.position);
        // Calculate bounding box for the central object (Station)
        this.centralObjectBoundingBox_ = new THREE.Box3().setFromObject(model);
        this.centralObjectBoundingBox_.getSize(this.centralObjectSize_ = new THREE.Vector3());
      } else {
        // Initial position for orbiting objects will be set in Update
        model.position.set(0, 0, 0); // Temporarily set to origin
        this.models_.push({ model: model, orbit: modelInfo.orbit });
      }

      if (modelInfo.rotation) {
        model.rotation.copy(modelInfo.rotation);
      }

      model.traverse((c) => {
        if (c.isMesh) {
          if (c.name === 'Cube' || c.name === 'Cylinder') {
            c.visible = false; // Hide the Cube and Cylinder meshes
          }
          c.castShadow = true;
          c.receiveShadow = true;

          // Apply ka, ks, kd colors if defined in modelInfo
          if (c.material) {
            const materials = Array.isArray(c.material) ? c.material : [c.material];
            materials.forEach(material => {
              if (material.isMeshPhongMaterial || material.isMeshStandardMaterial) {
                if (modelInfo.ka !== undefined) {
                  material.emissive.setHex(modelInfo.ka);
                }
                if (modelInfo.ks !== undefined) {
                  material.specular.setHex(modelInfo.ks);
                }
                if (modelInfo.kd !== undefined) {
                  material.color.setHex(modelInfo.kd);
                }
                material.needsUpdate = true;
              }
            });
          }
        }
      });

      this.scene_.add(model);

      if (modelInfo.filename === 'Station0.obj') {
        console.log('Calling createChildBoundingBoxes for Station0.obj');
        this.createChildBoundingBoxes(model);
      }

      if (modelInfo.collidable) {
        let bounds, helper;
        const collidable = {
          model: model,
          type: modelInfo.boundingType,
        };

        if (modelInfo.boundingType === 'box' && modelInfo.boundingBoxSize) {
          const { width, height, depth } = modelInfo.boundingBoxSize;
          const halfWidth = width / 2;
          const halfHeight = height / 2; // Center the box vertically
          const halfDepth = depth / 2;
          
          bounds = new THREE.Box3(
            new THREE.Vector3(-halfWidth, -halfHeight, -halfDepth),
            new THREE.Vector3(halfWidth, halfHeight, halfDepth)
          );
          // For orbiting objects, position will be updated in Update
          if (modelInfo.isCentral) {
            bounds.translate(modelInfo.position);
          }
          if (modelInfo.offset) {
            bounds.translate(modelInfo.offset);
          } // Move box to model's position

          helper = new THREE.Box3Helper(bounds, 0x00ff00);
          collidable.bounds = bounds;
          collidable.size = modelInfo.boundingBoxSize;

        } else if (modelInfo.boundingType === 'sphere' && modelInfo.boundingRadius) {
          // For orbiting objects, position will be updated in Update
          bounds = new THREE.Sphere(model.position, modelInfo.boundingRadius);
          if (modelInfo.offset) {
            bounds.center.add(modelInfo.offset);
          }
          
          const geometry = new THREE.SphereGeometry(modelInfo.boundingRadius, 16, 16);
          const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true, transparent: true, opacity: 0.5 });
          helper = new THREE.Mesh(geometry, material);
          // For orbiting objects, position will be updated in Update
          if (modelInfo.isCentral) {
            helper.position.copy(modelInfo.position);
          }

          collidable.bounds = bounds;
        }

        if (bounds) {
          this.collidables_.push(collidable);
          helper.visible = false;
          this.debugHelpers_.push({helper: helper, collidable: collidable});
          this.scene_.add(helper);
        }
      }
    }

    setObjectMaterialColors(filename, kaHex, ksHex, kdHex) {
      const model = this.loadedModels_.get(filename);
      if (!model) {
        console.warn(`Model with filename ${filename} not found.`);
        return;
      }

      model.traverse((child) => {
        if (child.isMesh && child.material) {
          // Handle single material or array of materials
          const materials = Array.isArray(child.material) ? child.material : [child.material];

          materials.forEach(material => {
            if (material.isMeshPhongMaterial || material.isMeshStandardMaterial) {
              if (kaHex !== undefined) {
                material.emissive.setHex(kaHex);
              }
              if (ksHex !== undefined) {
                material.specular.setHex(ksHex);
              }
              if (kdHex !== undefined) {
                material.color.setHex(kdHex);
              }
              material.needsUpdate = true;
            }
          });
        }
      });
    }

    Update(timeElapsed) {
      if (!this.centralObject_) {
        return; // Central object not loaded yet
      }

      const centralPosition = this.centralObject_.position;
      const centralRadius = Math.max(this.centralObjectSize_.x, this.centralObjectSize_.z) / 2;

      this.models_.forEach(item => {
        const { model, orbit } = item;
        if (orbit) {
          // Ensure orbit radius is larger than central object to avoid overlap
          const effectiveRadius = Math.max(orbit.radius, centralRadius + 5); // Add some buffer
          orbit.angle += orbit.speed * timeElapsed;
          const x = centralPosition.x + effectiveRadius * Math.cos(orbit.angle);
          const z = centralPosition.z + effectiveRadius * Math.sin(orbit.angle);
          const y = centralPosition.y + orbit.height;
          model.position.set(x, y, z);
        }
      });

      this.debugHelpers_.forEach(item => {
        const { helper, collidable } = item;

        // Update the world matrix of the collidable model
        collidable.model.updateMatrixWorld(true);

        if (collidable.type === 'box') {
            collidable.bounds.setFromObject(collidable.model);
            helper.box.copy(collidable.bounds);
        } else if (collidable.type === 'sphere') {
            helper.position.copy(collidable.bounds.center);
        }
      });
    }

    ToggleDebugVisuals(visible) {
      this.debugHelpers_.forEach((item) => {
        item.helper.visible = visible;
      });
    }

    GetCollidables() {
      return this.collidables_;
    }

    getCentralObjectTopY() {
      if (this.centralObject_ && this.centralObjectBoundingBox_) {
        // Ensure the central object's world matrix is updated before getting its bounding box
        this.centralObject_.updateMatrixWorld(true);
        this.centralObjectBoundingBox_.setFromObject(this.centralObject_);
        return this.centralObjectBoundingBox_.max.y;
      }
      return 0; // Default to 0 if central object not loaded or no bounding box
    }

    createChildBoundingBoxes(model) {
        model.updateMatrixWorld(true);

        let cubeMaxY = 0;
        // First pass: find the max Y of the Cube object
        model.traverse(node => {
            if (node.isMesh && node.name === 'Cube') {
                const cubeBoundingBox = new THREE.Box3().setFromObject(node);
                cubeMaxY = cubeBoundingBox.max.y;
                console.log(`Found Cube max Y: ${cubeMaxY}`);
            }
        });

        model.traverse(node => {
            if (node.isMesh && node.name !== 'map' && node.name !== 'aa' && node.name !== 'Cube') {
                console.log(`Found mesh: ${node.name || 'Unnamed Mesh'}. Creating bounding box.`);
                
                let boundingBox;
                if (node.userData.customBoundingBoxSize) {
                    const { width, height, depth } = node.userData.customBoundingBoxSize;
                    const halfWidth = width / 2;
                    const halfHeight = height / 2;
                    const halfDepth = depth / 2;
                    boundingBox = new THREE.Box3(
                        new THREE.Vector3(-halfWidth, -halfHeight, -halfDepth),
                        new THREE.Vector3(halfWidth, halfHeight, halfDepth)
                    );
                    boundingBox.applyMatrix4(node.matrixWorld);
                } else {
                    boundingBox = new THREE.Box3().setFromObject(node);
                }

                // Apply size reduction for Cylinder
                if (node.name === 'Cylinder') {
                    const currentSize = new THREE.Vector3();
                    boundingBox.getSize(currentSize);
                    const scaleFactor = 0.5; // Reduce to 50%
                    const newSize = currentSize.multiplyScalar(scaleFactor);

                    // Recalculate min/max based on new size and original center
                    const center = new THREE.Vector3();
                    boundingBox.getCenter(center);
                    boundingBox.min.copy(center).sub(newSize.clone().multiplyScalar(0.5));
                    boundingBox.max.copy(center).add(newSize.clone().multiplyScalar(0.5));
                }

                // Adjust bounding box to match Cube's max Y
                if (cubeMaxY !== 0) { // Only adjust if Cube's max Y was found
                    const currentHeight = boundingBox.max.y - boundingBox.min.y;
                    boundingBox.max.y = cubeMaxY;
                    boundingBox.min.y = cubeMaxY - currentHeight;
                }

                node.userData.boundingBox = boundingBox;

                const collidable = {
                    model: node,
                    type: 'box',
                    bounds: boundingBox,
                    size: {
                        width: boundingBox.max.x - boundingBox.min.x,
                        height: boundingBox.max.y - boundingBox.min.y,
                        depth: boundingBox.max.z - boundingBox.min.z
                    }
                };

                const helper = new THREE.Box3Helper(boundingBox, 0x00ff00); // Green for all boxes

                this.collidables_.push(collidable);
                this.debugHelpers_.push({ helper: helper, collidable: collidable });
                this.scene_.add(helper);
                console.log(`Added Bounding Box for: ${node.name}`);
            }
        });
    }
  }

  return {
    NPC: NatureObject,
  };
})();