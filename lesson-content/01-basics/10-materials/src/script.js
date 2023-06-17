// Module imports
import * as THREE from 'three';
import {
    MeshDepthMaterial,
    MeshLambertMaterial,
    MeshMatcapMaterial,
    MeshPhongMaterial,
    MeshStandardMaterial,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import GUI from 'lil-gui';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/* -------------------------- load custom textures -------------------------- */

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
    console.log('loadingManager: onStart');
};

loadingManager.onLoad = () => {
    console.log('loadingManager: onLoad');
};

loadingManager.onProgress = () => {
    console.log('loadingManager: onProgress');
};

loadingManager.onError = () => {
    console.log('loadingManager: onError');
};

const textureLoader = new THREE.TextureLoader(loadingManager);

const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load(
    '/textures/door/ambientOcclusion.jpg'
);
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg');
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;
const matcapTexture = textureLoader.load('/textures/matcaps/8.png');

/* -------------------------------------------------------------------------- */
/*                                  Materials                                 */
/* -------------------------------------------------------------------------- */

// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color.set(0xff00ff);
// material.wireframe = true;
// material.opacity = 0.2;
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

/* --------------------------- MeshNormalMaterial --------------------------- */

// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

/* --------------------------- MeshMatcapMaterial --------------------------- */

// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

/* ---------------------------- MeshDepthMaterial --------------------------- */

// const material = new THREE.MeshDepthMaterial();

/* --------------------------- MeshLambertMaterial -------------------------- */

// It's performant but we can see strange patterns on the geometry
// const material = new THREE.MeshLambertMaterial();

/* ---------------------------- MeshPhongMaterial --------------------------- */

// All the benefits of the meshLambertMaterial without the weird artifacts
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 1000;
// material.specular = new THREE.Color(0x1188ff);

/* ---------------------------- MeshToonMaterial ---------------------------- */

// const material = new THREE.MeshToonMaterial();
// We lose the cartoonish effect when using a gradient texture
// Blurs it by using mipmapping
// material.gradientMap = gradientTexture;

/* -------------------------- MeshStandardMaterial -------------------------- */

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.45;
material.roughness = 0.85;

/* -------------------------------------------------------------------------- */
/*                                   objects                                  */
/* -------------------------------------------------------------------------- */

/* --------------------------------- sphere --------------------------------- */

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);

sphere.position.x = -1.5;

/* ---------------------------------- plane --------------------------------- */

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);

/* ---------------------------------- torus --------------------------------- */

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
);

torus.position.x = 1.5;

scene.add(sphere, plane, torus);

/* -------------------------------------------------------------------------- */
/*                                   lights                                   */
/* -------------------------------------------------------------------------- */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

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
camera.position.z = 2;
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

    // Update objects position
    sphere.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = 0.1 * elapsedTime;
    plane.rotation.x = 0.1 * elapsedTime;
    torus.rotation.x = 0.1 * elapsedTime;

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
