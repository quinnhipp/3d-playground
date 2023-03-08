import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
});
const torus = new THREE.Mesh(geometry, material);

//scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(250));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load("space.png");
scene.background = spaceTexture;

// Avatar
const slothTexture = new THREE.TextureLoader().load("sloth.jpg");

const sloth = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: slothTexture })
);

scene.add(sloth);

// Moon
const moonTexture = new THREE.TextureLoader().load("moon.jpeg");
const normalTexture = new THREE.TextureLoader().load("normal.jpeg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

// Mars
const marsTexture = new THREE.TextureLoader().load("mars.jpeg");

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture,
  })
);

scene.add(mars);

// Pencil
const loader = new GLTFLoader();

loader.load(
  "simple_pencil/scene.gltf",
  function (gltf) {
    gltf.scene.rotation.x = Math.PI / 4;
    gltf.scene.rotation.y = Math.PI / 4;
    gltf.scene.rotation.z = Math.PI / 4;
    gltf.scene.position.x = -10;
    gltf.scene.position.y = 3;
    gltf.scene.position.z = 2;
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Shiba
loader.load(
  "shiba/scene.gltf",
  function (gltf) {
    gltf.scene.rotation.y = -(Math.PI / 7);
    gltf.scene.position.x = 15;
    gltf.scene.position.y = 20;
    gltf.scene.position.z = -10;
    gltf.scene.scale.set(10, 10, 10);
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

moon.position.z = 30;
moon.position.setX(-10);

mars.position.z = 50;
mars.position.x = 15;
mars.position.y = 5;

sloth.position.z = -5;
sloth.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  mars.rotation.x += 0.05;
  mars.rotation.y += 0.075;
  mars.rotation.z += 0.05;

  sloth.rotation.y += 0.01;
  sloth.rotation.z += 0.01;

  camera.position.z = t * -0.05;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  mars.rotation.x += 0.005;

  //controls.update();

  renderer.render(scene, camera);
}

animate();
