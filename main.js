import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function animate() {
  const positions = starGeo.attributes.position.array;
  for (let i = 0; i < geoArr.length; i++) {
    geoArr[i].velocity += geoArr[i].acceleration;
    positions[i * 3 + 1] -= geoArr[i].velocity;

    if (positions[i * 3 + 1] < -2) {
      positions[i * 3 + 1] = 200;
      geoArr[i].velocity = 0;
    }
  }

  starGeo.attributes.position.needsUpdate = true;
  stars.rotation.y += 0.002
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene, camera);

}


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function generateStars() {
  for (let i = 0; i < 10000; i++) {
    const star = new THREE.Vector3(
      Math.random() * 2000 - 1600,
      Math.random() * 2000,
      Math.random() * 2000 - 1600
    );
    star.velocity = 0;
    star.acceleration = 0.001;
    geoArr.push(star);
  };
}
window.addEventListener('resize', onWindowResize, false);

let geoArr = [];
let starGeo;
let stars;
let width = window.innerWidth;
let height = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  100,
  width / height,
  .01,
  1000);

// camera.rotation.x = Math.PI * 0.5;
camera.position.y = Math.PI * -0.5+1
camera.position.x = 0;
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(width, height);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;

generateStars();
starGeo = new THREE.BufferGeometry().setFromPoints(geoArr);

const sprite = new THREE.TextureLoader().load("Ellipse.png");

const starMaterial = new THREE.PointsMaterial({
  color: 0x39c58a,
  size: 1.2,
  map: sprite,
});
stars = new THREE.Points(starGeo, starMaterial);
scene.add(stars);

const loader = new GLTFLoader();
loader.load(
  'studentstay.gltf',
  (asset) => {

    asset.scene.scale.set(0.2, 0.2, 0.2);
    asset.scene.position.set(0, 1.5, 0);
    asset.scene.rotation.x = Math.PI;
    scene.add(asset.scene);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  (error) => {
    console.log('An error happened');
  }
);


const light2 = new THREE.PointLight(0xffffff, 0.8);
light2.position.set(-2.5, -2, 0);
scene.add(light2);
const light3 = new THREE.PointLight(0xffffff, 0.8);
light3.position.set(3, -2, 0);
scene.add(light3);
const pictureTexture = new THREE.TextureLoader().load('niki and me.jpg');
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(3, 0, 3),
  new THREE.MeshBasicMaterial({
    map: pictureTexture,
  })
);
cube.position.set(0, -10, 0);
scene.add(cube);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);


animate();





