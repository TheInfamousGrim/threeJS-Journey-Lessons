import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Textures
import doorColorTexture from '../static/textures/door/color.jpg';

/* -------------------------------------------------------------------------- */
/*                                  Textures                                  */
/* -------------------------------------------------------------------------- */
const loadingManger = new THREE.LoadingManager();

loadingManger.onStart = () => {
    console.log('loadingManager: onStart');
};

loadingManger.onLoad = () => {
    console.log('loadingManager: onLoad');
};

loadingManger.onProgress = () => {
    console.log('loadingManager: onProgress');
};

loadingManger.onError = () => {
    console.log('loadingManager: onError');
};

const textureLoader = new THREE.TextureLoader(loadingManger);
// const colorTexture = textureLoader.load('/textures/door/color.jpg');
// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png');
// const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png');
const colorTexture = textureLoader.load('/textures/minecraft.png');
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const ambientOcclusionTexture = textureLoader.load(
    '/textures/door/ambientOcclusion.jpg'
);
const heightTexture = textureLoader.load('/textures/door/height.jpg');
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
// Normal should always be .png!!!
const normalTexture = textureLoader.load('/textures/door/normal.jpg');
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

/* -------------------------- Transforming textures ------------------------- */

// Repeating textures
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;
// Mirror Repeat Wrapping
// colorTexture.wrapS = THREE.MirrorRepeatWrapping;
// colorTexture.wrapT = THREE.MirrorRepeatWrapping;

// Offset the door texture
// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// Rotate the door texture
// colorTexture.rotation = Math.PI / 4;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

/* ------------------------ Filtering and Midmapping ------------------------ */

// Texture filters
// WE DON'T NEED MIDMAPS WHEN WE'RE USING TEXTURE FILTERS
colorTexture.generateMipmaps = false;
// colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

/* --------------------- Texture format and optimisation -------------------- */
// Three things to keep in mind when using textures
// 1. The weight (number of texture files)
// Use jpg where possible
// You can use sites like tinyPNG for .png files
// 2. The size (resolution of texture files)
// 3. The data that is in the textures

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Texture stuff
// UV Coordinates
// console.log(geometry.attributes.uv);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
