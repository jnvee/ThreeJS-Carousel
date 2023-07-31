import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import page from "page";

export function renderLoadingScreen() {
  //Scene
  const scene = new THREE.Scene();

  // Loading Text
  const fontLoader = new FontLoader();
  fontLoader.load("/fonts/font.json", (font) => {
    const textGeometry = new TextGeometry("LOADING", {
      font: font,
      size: 0.5,
      height: 0.1,
      curveSegments: 12,
      // bevelEnabled: true,
      // bevelSize: 0.0001,
      // bevelOffset: 0,
      // // bevelSegments: 5,
    });
    const textMaterial = new THREE.MeshBasicMaterial();
    const text = new THREE.Mesh(textGeometry, textMaterial);
    text.position.set(-1.5, -2, 0);
    scene.add(text);
  });
  //Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.6,
    1200
  );
  camera.position.z = 10; //Offset

  //Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor("#233143");
  renderer.setSize(window.innerWidth, window.innerHeight);
  const canvas = renderer.domElement;

  // Append the canvas element to the appContainer
  const appContainer = document.getElementById("app");
  appContainer.innerHTML = "";
  appContainer.appendChild(canvas);

  //Responsive
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });

  //Creating the Cube
  const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
  const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  boxMesh.rotation.set(40, 0, 40);
  boxMesh.position.set(0, 3, 0);
  scene.add(boxMesh);

  //Creating the 4 spheres buzzing 'round the cube
  const sphereMeshes = [];

  const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32);
  const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xc56cef });

  for (let i = 0; i < 4; i++) {
    sphereMeshes[i] = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphereMeshes[i].position.set(0, 0, 0);
    scene.add(sphereMeshes[i]);
  }

  //Math and Trig stuff to animate smol spheres
  //Orbital Paths for spheres
  let theta = 0;
  const dtheta = (2 * Math.PI) / 90; // 2pi / no of increments per revolution (aka, smol no. = faster ball speed)
  //update theta incrementing in rendering function

  //Lighting
  const lights = [];
  // const lightHelpers = [];
  const lightValues = [
    { colour: 0xb2a4ff, intensity: 8, dist: 12, x: 1, y: 0, z: 8 },
    { colour: 0x810ca8, intensity: 6, dist: 12, x: -2, y: 1, z: -10 },
    { colour: 0xc147e9, intensity: 3, dist: 10, x: 0, y: 10, z: 1 },
    { colour: 0xe5b8f4, intensity: 6, dist: 12, x: 0, y: -10, z: -1 },
    { colour: 0xbe5a83, intensity: 6, dist: 12, x: 10, y: 3, z: 0 },
    { colour: 0xe06469, intensity: 6, dist: 12, x: -10, y: -1, z: 0 },
  ];
  for (let i = 0; i < 6; i++) {
    lights[i] = new THREE.PointLight(
      lightValues[i]["colour"],
      lightValues[i]["intensity"],
      lightValues[i]["dist"]
    );
    lights[i].position.set(
      lightValues[i]["x"],
      lightValues[i]["y"],
      lightValues[i]["z"]
    );
    scene.add(lights[i]);
    // lightHelpers[i] = new THREE.PointLightHelper(lights[i],0.7);
    // scene.add(lightHelpers[i])
  }
  //Rendering Function (ticks, animations and stuff)
  const rendering = function () {
    requestAnimationFrame(rendering);

    //Orbital path spheres incrementation
    theta += dtheta;

    // Store trig functions for sphere orbits
    // MUST BE INSIDE RENDERING FUNCTION OR
    // THETA VALUES ONLY GET SET ONCE
    const trigs = [
      {
        x: Math.cos(theta * 1.05),
        y: Math.sin(theta * 1.05),
        z: Math.cos(theta * 1.05),
        r: 2,
      },
      {
        x: Math.cos(theta * 0.8),
        y: Math.sin(theta * 0.8),
        z: Math.sin(theta * 0.8),
        r: 2.25,
      },
      {
        x: Math.cos(theta * 1.25),
        y: Math.cos(theta * 1.25),
        z: Math.sin(theta * 1.25),
        r: 2.5,
      },
      {
        x: Math.sin(theta * 0.6),
        y: Math.cos(theta * 0.6),
        z: Math.sin(theta * 0),
        r: 2.75,
      },
    ];
    // Loop 4 times (for each sphere), updating the position
    for (let i = 0; i < 4; i++) {
      sphereMeshes[i].position.x = trigs[i]["r"] * trigs[i]["x"];
      sphereMeshes[i].position.y = trigs[i]["r"] * trigs[i]["y"] + 3;
      sphereMeshes[i].position.z = trigs[i]["r"] * trigs[i]["z"];
    }

    //rotate animation on cube
    boxMesh.rotation.z -= 0.005;
    boxMesh.rotation.x -= 0.01;

    renderer.render(scene, camera);
  };
  rendering();
}
