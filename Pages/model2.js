import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { loadPorscheModel } from "../model_loaders";

export function renderModel2() {
  let carModel;
  // Scene , camera and renderer
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xff683ae8);
  scene.fog = new THREE.Fog(0xff683ae8, 60, 100);

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.z = 30;
  camera.position.x = 10;
  camera.position.y = 10;

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.shadowMap.enabled = true;
  document.getElementById("app").appendChild(renderer.domElement);

  //Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Enable smooth camera movement
  controls.dampingFactor = 0.05; // Adjust the damping factor for smoothness

  //Light helpers
  // Add lights
  let hemiLight = new THREE.HemisphereLight(0xffa460ed, 0xffffddee, 1);
  hemiLight.position.set(20, 10, 20);
  scene.add(hemiLight);
  let lighthelper2 = new THREE.HemisphereLightHelper(hemiLight, 5);
  // scene.add(lighthelper2);

  let d = 8.25;
  let dirLight = new THREE.DirectionalLight(0xffffddee, 1);
  dirLight.position.set(-8, 12, 8);
  let lighthelper1 = new THREE.DirectionalLightHelper(dirLight, 5);
  // scene.add(lighthelper1);
  // dirLight.castShadow = true;
  // dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
  // dirLight.shadow.camera.near = 0.1;
  // dirLight.shadow.camera.far = 1500;
  // dirLight.shadow.camera.left = d * -1;
  // dirLight.shadow.camera.right = d;
  // dirLight.shadow.camera.top = d;
  // dirLight.shadow.camera.bottom = d * -1;
  scene.add(dirLight);

  //Floor
  let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
  let floorMaterial = new THREE.MeshPhongMaterial({
    color: 0xff7d22bf,
    shininess: 100,
  });

  let floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -0.5 * Math.PI;
  // floor.receiveShadow = true;
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
  loadPorscheModel().then((result) => {
    if (result) {
      carModel = result.carModel;
      //   catMixer = result.catMixer;
      // Add model1 to the scene or perform any other setup if necessary
      scene.add(carModel);
    }
  });

  //Update method
  function animate() {
    // catAnimate(catMixer);
    controls.update();
    scene.rotation.y += 0.0009;
    // Render the scene with the camera
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}
