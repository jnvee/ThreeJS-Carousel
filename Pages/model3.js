import * as THREE from "three";
import { animateModel, loadRobotModel } from "../model_loaders";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function renderModel3() {
  let robotModel, robotMixer;
  // Scene , camera and renderer
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xff993108);
  scene.fog = new THREE.Fog(0xff993108, 60, 100);

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 30;
  camera.position.x = -5;
  camera.position.y = 15;

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
    color: 0xffab280a,
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
  loadRobotModel().then((result) => {
    if (result) {
      robotModel = result.robotModel;
      robotMixer = result.robotMixer;
      // Add model1 to the scene or perform any other setup if necessary
      scene.add(robotModel);
    }
  });

  //Update method
  function animate() {
    animateModel(robotMixer);
    controls.update();
    // Render the scene with the camera
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}
