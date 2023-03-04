import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let scene, camera, renderer;
let geoArr = [];
let starGeo;
let stars;
let width = window.innerWidth;
let height = window.innerHeight;

addEventListener("resize", (event) => {
  width = window.innerWidth;
  height = window.innerHeight;
});

onresize = (event) => {
  width = window.innerWidth;
  height = window.innerHeight;
};


function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    width / height,
    1,
    1000);
  camera.rotation.x = Math.PI * 0.5;


  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);

  for (let i = 0; i < 10000; i++) {
    const star = new THREE.Vector3(
      Math.random() * 2000 - 1600,
      Math.random() * 2000,
      Math.random() * 2000 - 1600,
    );
    star.velocity = 0;
    star.acceleration = 0.001;
    geoArr.push(star);


  };
  starGeo = new THREE.BufferGeometry().setFromPoints(geoArr);

  let sprite = new THREE.TextureLoader().load("circle.png");
  let starMaterial = new THREE.PointsMaterial({
    color: "gray",
    size: 0.6,
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



  animate();
}
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
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();

