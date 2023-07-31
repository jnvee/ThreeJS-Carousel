import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { TextureLoader } from "three";
//
//
//LOADING CAT MODEL
//set main variables
let catModel,
  catMixer,
  carModel,
  robotModel,
  robotMixer,
  compModel,
  compMixer,
  speederModel,
  clock = new THREE.Clock();

function loadCatModel() {
  return new Promise((resolve, reject) => {
    const catModelPath = "/Cat/cat.gltf";

    const result = {
      catModel: null,
      catMixer: null,
    };

    //Load Textures
    let cat_txt = new THREE.TextureLoader().load("/Cat/texture.png");
    cat_txt.flipY = false;

    const cat_mtl = new THREE.MeshPhongMaterial({
      map: cat_txt,
      color: 0xffffff,
      skinning: true, //imp for animated models
    });

    //Load the model
    var loader = new GLTFLoader();
    loader.load(
      catModelPath,
      function (gltf) {
        catModel = gltf.scene;
        let fileanimations = gltf.animations;

        catModel.scale.set(13, 13, 13);
        catModel.position.x = 0;
        catModel.position.y = 0;

        catModel.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            o.material = cat_mtl;
          }
        });

        //Animating the neko
        catMixer = new THREE.AnimationMixer(catModel);
        let walkAnim = THREE.AnimationClip.findByName(
          fileanimations,
          "Object_0"
        );
        let walk = catMixer.clipAction(walkAnim);
        walk.play();

        result.catModel = catModel;
        result.catMixer = catMixer;

        resolve(result);
      },
      undefined,
      function (error) {
        console.error(error);
        reject(error);
      }
    );
  });
}

export { loadCatModel };

function animateModel(mixer) {
  //Animate the walk
  if (mixer) {
    mixer.update(clock.getDelta());
  }
}

export { animateModel };

function loadPorscheModel() {
  return new Promise((resolve, reject) => {
    const carModelPath = "/Porsche/porsche.glb";

    const result = {
      carModel: null,
      // catMixer: null,
    };
    //Load the model
    var loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./node_modules/three/examples/jsm/libs/draco/");
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      carModelPath,
      function (gltf) {
        carModel = gltf.scene;

        carModel.scale.set(4, 4, 4);
        carModel.position.x = 0;
        carModel.position.y = 1;

        carModel.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
        });

        result.carModel = carModel;

        resolve(result);
      },
      undefined,
      function (error) {
        console.error(error);
        reject(error);
      }
    );
  });
}
export { loadPorscheModel };

function loadRobotModel() {
  return new Promise((resolve, reject) => {
    const robotModelPath = "/Robot/scene.gltf";

    const result = {
      robotModel: null,
      robotMixer: null,
    };

    //Load Textures
    // let cat_txt = new THREE.TextureLoader().load("/Cat/texture.png");
    // cat_txt.flipY = false;

    // const cat_mtl = new THREE.MeshPhongMaterial({
    //   map: cat_txt,
    //   color: 0xffffff,
    //   skinning: true, //imp for animated models
    // });

    //Load the model
    var loader = new GLTFLoader();
    loader.load(
      robotModelPath,
      function (gltf) {
        robotModel = gltf.scene;
        let fileanimations = gltf.animations;

        robotModel.scale.set(4, 4, 4);
        robotModel.position.x = 0;
        robotModel.position.y = 3.8;
        robotModel.rotation.y = 90;

        robotModel.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            // o.material = cat_mtl;
          }
        });

        //Animating the neko
        robotMixer = new THREE.AnimationMixer(robotModel);

        //logging all animations in the model
        // fileanimations.forEach((animation, index) => {
        //   console.log(`Animation ${index + 1}: ${animation.name}`);
        // });
        let idleAnim = THREE.AnimationClip.findByName(
          fileanimations,
          "Idel_Animation"
        );
        let walkAnim = THREE.AnimationClip.findByName(
          fileanimations,
          "Walkcycle_Animation"
        );
        let idle = robotMixer.clipAction(idleAnim);
        let walk = robotMixer.clipAction(walkAnim);
        walk.play();

        //CLick to walk
        // renderer.domElement.addEventListener("click", function () {
        //   if (!walk.isRunning()) {
        //     walk.play();
        //   }
        // });

        result.robotModel = robotModel;
        result.robotMixer = robotMixer;

        resolve(result);
      },
      undefined,
      function (error) {
        console.error(error);
        reject(error);
      }
    );
  });
}
export { loadRobotModel };

function loadComputerModel() {
  return new Promise((resolve, reject) => {
    const compModelPath = "/computer/scene.gltf";

    const result = {
      compModel: null,
      compMixer: null,
    };

    //Load Textures
    // let cat_txt = new THREE.TextureLoader().load("/Cat/texture.png");
    // cat_txt.flipY = false;

    // const cat_mtl = new THREE.MeshPhongMaterial({
    //   map: cat_txt,
    //   color: 0xffffff,
    //   skinning: true, //imp for animated models
    // });

    //Load the model
    var loader = new GLTFLoader();
    loader.load(
      compModelPath,
      function (gltf) {
        compModel = gltf.scene;
        let fileanimations = gltf.animations;

        compModel.scale.set(5, 5, 5);
        compModel.position.x = 0;
        compModel.position.y = 0.4;
        compModel.position.z = 0;

        compModel.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
        });

        //Animating the model
        compMixer = new THREE.AnimationMixer(compModel);

        //logging all animations in the model
        // fileanimations.forEach((animation, index) => {
        //   console.log(`Animation ${index + 1}: ${animation.name}`);
        // });
        let idleAnim = THREE.AnimationClip.findByName(
          fileanimations,
          "Animation"
        );
        let idle = compMixer.clipAction(idleAnim);
        idle.play();

        result.compModel = compModel;
        result.compMixer = compMixer;

        resolve(result);
      },
      undefined,
      function (error) {
        console.error(error);
        reject(error);
      }
    );
  });
}
export { loadComputerModel };

function loadSpeederModel() {
  return new Promise((resolve, reject) => {
    const speederModelPath = "/Speeder/scene.gltf";

    const result = {
      speederModel: null,
    };
    //Load the model
    var loader = new GLTFLoader();
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath("./node_modules/three/examples/jsm/libs/draco/");
    // loader.setDRACOLoader(dracoLoader);

    loader.load(
      speederModelPath,
      function (gltf) {
        speederModel = gltf.scene;

        speederModel.scale.set(8, 8, 8);
        speederModel.position.x = 0;
        speederModel.position.y = 10;

        speederModel.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
          }
        });

        result.speederModel = speederModel;

        resolve(result);
      },
      undefined,
      function (error) {
        console.error(error);
        reject(error);
      }
    );
  });
}
export { loadSpeederModel };
