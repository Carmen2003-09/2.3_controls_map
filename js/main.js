import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { MapControls } from 'three/addons/controls/MapControls.js';

let camera, controls, scene, renderer;

init();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xd6f5e3); // 🔹 verde pastel claro
  scene.fog = new THREE.FogExp2(0xd6f5e3, 0.002);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 200, -400);

  // controls
  controls = new MapControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 100;
  controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2;

  // world
  const geometry = new THREE.BoxGeometry();
  geometry.translate(0, 0.5, 0);

  const material = new THREE.MeshPhongMaterial({
    color: 0x99e6b3, // 🔹 verde pastel en cubos
    flatShading: true
  });

  for (let i = 0; i < 500; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 1600 - 800;
    mesh.position.y = 0;
    mesh.position.z = Math.random() * 1600 - 800;
    mesh.scale.x = 20;
    mesh.scale.y = Math.random() * 80 + 10;
    mesh.scale.z = 20;
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    scene.add(mesh);
  }

  // lights (con un toque cálido/verde)
  const dirLight1 = new THREE.DirectionalLight(0xccffdd, 2.5); // 🔹 verde claro
  dirLight1.position.set(1, 1, 1);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x88cc99, 2); // 🔹 verde más suave
  dirLight2.position.set(-1, -1, -1);
  scene.add(dirLight2);

  const ambientLight = new THREE.AmbientLight(0xaaffcc, 1.5); // 🔹 luz ambiente verde pastel
  scene.add(ambientLight);

  // resize event
  window.addEventListener('resize', onWindowResize);

  const gui = new GUI();
  gui.add(controls, 'zoomToCursor');
  gui.add(controls, 'screenSpacePanning');
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  controls.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}
