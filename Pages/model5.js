import * as THREE from "three";
import { loadSpeederModel } from "../model_loaders";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { GroundProjectedSkybox } from "three/addons/objects/GroundProjectedSkybox.js";
//
//
export function renderModel5() {
  let speederModel, skybox;
  const params = {
    height: 20,
    radius: 440,
  };

  // Scene , camera and renderer
  const scene = new THREE.Scene();

  const hdrLoader = new RGBELoader();
  const envMap = hdrLoader.load("/Speeder/belfast_sunset_2k.hdr");
  envMap.mapping = THREE.EquirectangularReflectionMapping;

  skybox = new GroundProjectedSkybox(envMap);
  skybox.scale.setScalar(100);
  scene.add(skybox);

  scene.environment = envMap;

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;
  camera.position.x = 0;
  camera.position.y = 8;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.getElementById("app").appendChild(renderer.domElement);

  //Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Enable smooth camera movement
  controls.dampingFactor = 0.05; // Adjust the damping factor for smoothness
  controls.maxPolarAngle = THREE.MathUtils.degToRad(90);
  controls.maxDistance = 80;
  controls.minDistance = 20;
  controls.enablePan = false;
  // Add lights
  let hemiLight = new THREE.HemisphereLight(0xff22a699, 0xffb31312, 0.61);
  hemiLight.position.set(30, 10, 20);
  scene.add(hemiLight);

  let d = 8.25;
  let dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
  dirLight.position.set(-8, 12, 8);
  scene.add(dirLight);

  dirLight.castShadow = true;
  dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 1500;
  dirLight.shadow.camera.left = d * -1;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = d * -1;
  scene.add(dirLight);

  //resizing
  window.addEventListener("resize", onWindowResize);
  function onWindowResize() {
    // Update the renderer size and aspect ratio
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  //Add models to the scene
  loadSpeederModel().then((result) => {
    if (result) {
      speederModel = result.speederModel;
      // Add model1 to the scene or perform any other setup if necessary
      scene.add(speederModel);
    }
  });

  //Update method
  function animate() {
    controls.update();
    if (speederModel) {
      speederModel.position.y = 1 * Math.sin(Date.now() * 0.002); // Adjust the amplitude and speed here
    }
    // Render the scene with the camera
    renderer.render(scene, camera);
    skybox.radius = params.radius;
    skybox.height = params.height;
    requestAnimationFrame(animate);
  }
  animate();
}
