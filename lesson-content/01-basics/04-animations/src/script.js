import './style.css';
import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
    width: 800,
    height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(sizes.width, sizes.height);

/* -------------------------------------------------------------------------- */
/*                                 animations                                 */
/* -------------------------------------------------------------------------- */

/* ------------------------------- time method ------------------------------ */
// Get time
// let time = Date.now();

/* ------------------------------ clock method ------------------------------ */
const clock = new THREE.Clock();

const tick = () => {
    // Adapt to the frame rate
    // const currentTime = Date.now();
    // Get the difference between the current time and the time from the previous tick.
    // const deltaTime = currentTime - time;
    // time = currentTime;

    // Clock method
    const elapsedTime = clock.getElapsedTime();

    // Update object position
    // mesh.rotation.y += 0.01;
    // This is one revolution per second
    // mesh.rotation.y = elapsedTime * Math.PI * 2;
    // mesh.position.y = Math.sin(elapsedTime);
    // mesh.position.x = Math.cos(elapsedTime);

    camera.position.y = Math.sin(elapsedTime);
    camera.position.x = Math.cos(elapsedTime);
    camera.lookAt(mesh.position);

    // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

// Always call the tick function once at the end
tick();
