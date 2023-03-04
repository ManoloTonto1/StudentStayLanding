import * as THREE from 'three'; 
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const helper = new THREE.CameraHelper( camera );
scene.add( helper );
const loader = new GLTFLoader();
loader.load(
    'studentstay.gltf',
    (asset) => {
        scene.add(asset.scene);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.log('An error happened');
    }
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const light = new THREE.AmbientLight( 0xffffff, 3, 10 );
scene.add( light );




function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

