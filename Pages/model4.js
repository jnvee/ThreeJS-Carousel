import * as THREE from "three";
import { loadComputerModel } from "../model_loaders";
import { animateModel } from "../model_loaders";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
//
//
export function renderModel4() {
  let compModel, compMixer;

  // Scene , camera and renderer
  const scene = new THREE.Scene();
  const floorColor = new THREE.Color(0xff7aeae6);
  scene.background = new THREE.Color(0xff7aeae6);
  scene.fog = new THREE.Fog(0xff7aeae6, 60, 100);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 20;
  camera.position.x = 0;
  camera.position.y = 10;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.getElementById("app").appendChild(renderer.domElement);

  //Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Enable smooth camera movement
  controls.dampingFactor = 0.05; // Adjust the damping factor for smoothness

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

  //Floor
  let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
  let floorMaterial = new THREE.MeshPhongMaterial({
    color: floorColor,
    shininess: 100,
    reflectivity: 1,
  });

  let floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -0.5 * Math.PI;
  floor.receiveShadow = true;
  floor.position.y = 0;
  scene.add(floor);

  //resizing
  window.addEventListener("resize", onWindowResize);
  function onWindowResize() {
    // Update the renderer size and aspect ratio
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  //Add models to the scene
  loadComputerModel().then((result) => {
    if (result) {
      compModel = result.compModel;
      compMixer = result.compMixer;
      // Add model1 to the scene or perform any other setup if necessary
      scene.add(compModel);
    }
  });

  //Update method
  function animate() {
    animateModel(compMixer);
    controls.update();
    scene.rotation.y += 0.0009;
    // Render the scene with the camera
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}
