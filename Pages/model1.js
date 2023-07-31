import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { loadCatModel, animateModel } from "../model_loaders";
import page from "page";

export function renderModel1() {
  let catModel, catMixer;
  // Set up the scene, camera, and renderer
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xff468b97);
  scene.fog = new THREE.Fog(0xff468b97, 60, 100);

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.x = 20;
  camera.position.y = 10;
  camera.position.z = 10;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.getElementById("app").appendChild(renderer.domElement);

  // Create a cube
  // const geometry = new THREE.BoxGeometry(); // Default size: 1x1x1
  // const material = new THREE.MeshLambertMaterial({ color: 0xffffff }); // white color
  // const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  //Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Enable smooth camera movement
  controls.dampingFactor = 0.05; // Adjust the damping factor for smoothness

  // Add lights
  let hemiLight = new THREE.HemisphereLight(0x6527be, 0xff8551, 0.61);
  hemiLight.position.set(0, 50, 0);
  // Add hemisphere light to scene
  scene.add(hemiLight);

  let d = 8.25;
  let dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
  dirLight.position.set(-8, 12, 8);

  dirLight.castShadow = true;
  dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  dirLight.shadow.camera.near = 0.1;
  dirLight.shadow.camera.far = 1500;
  dirLight.shadow.camera.left = d * -1;
  dirLight.shadow.camera.right = d;
  dirLight.shadow.camera.top = d;
  dirLight.shadow.camera.bottom = d * -1;
  // Add directional Light to scene
  scene.add(dirLight);

  //Floor
  let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
  let floorMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0b666a,
    shininess: 0,
  });

  let floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -0.5 * Math.PI;
  floor.receiveShadow = true;
  floor.position.y = 0;
  scene.add(floor);

  //resizing
  window.addEventListener("resize", onWindowResize);

  animate();

  function onWindowResize() {
    // Update the renderer size and aspect ratio
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  //Add models to the scene
  loadCatModel().then((result) => {
    if (result) {
      catModel = result.catModel;
      catMixer = result.catMixer;
      // Add model1 to the scene or perform any other setup if necessary
      scene.add(catModel);
    }
  });

  // Update function
  function animate() {
    animateModel(catMixer);
    controls.update();
    // Render the scene with the camera
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  function checkRoute() {
    const currentRoute = page.current || "/One";
    const arrowButton = document.getElementById("arrow-button");

    // Show the arrow button only on the "about" page
    if (currentRoute === "/One") {
      arrowButton.style.display = "block";
    } else {
      arrowButton.style.display = "none";
    }
  }
  page("*", checkRoute);
}
