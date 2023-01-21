import './style.css';
import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);

/* --------------------------------- groups --------------------------------- */
// Create the group
const group = new THREE.Group();
scene.add(group);

// Create a group of three cubes
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

// cube 1
// Add the cube to the group
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);

// cube 2
// Move the cube to the left
cube2.position.x = -2;

// Add the cube to the group
group.add(cube2);

// cube 3
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
);

// Move the cube to the left
cube3.position.x = 2;

// Add the cube to the group
group.add(cube3);

group.position.y = 1;
group.scale.y = 2;
group.rotation.y = 2;

/* -------------------------------- positions ------------------------------- */

// These properties can be adjusted almost any where except after the render has been processed
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
// scene.add(mesh);

/* ------------------------------- axes helper ------------------------------ */
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/* ------------------------------ scale objects ----------------------------- */
// mesh.scale.x = 2;
// mesh.scale.y = 0.5;
// mesh.scale.z = 0.5;

/* ----------------------------- rotate objects ----------------------------- */

// We can use rotation property
// The properties that are affected are Euler Angles
// Euler angles describe a rotational transformation by rotating an object on its various axes in a specified amounts per axis, and a specified axis order.

// Rotate 180 degrees
// mesh.rotation.y = Math.PI * 0.5;
// mesh.rotation.reorder('YXZ');
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;

// If you do too many rotations you can get GIMBAL LOCK (one or more axes no longer rotates)
// You can change the order by using the reorder(...) method
// object.rotation.reorder('yxz')
// DO THIS BEFORE THE ROTATION

// We can use quaternion property
// Although the Euler angles are easier to understand the GIMBAL LOCK issue can be problematic
// That is why most engines and 3D softwares use Quaternion angles

// mesh.scale.set(2, 0.5, 0.5);

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

/* ------- You can use Vector3 class to get various vector properties ------- */

// the length is the Euclidean distance (straight line distance) from the origin (0, 0, 0) to (x, y, z)
// console.log('.length():', mesh.position.length());

// .distanceTo() will give the length from vector v to vector w
// console.log('.distanceTo():', mesh.position.distanceTo(camera.position));

// .normalize() returns the unit vector - that is, sets it equal to a vector with the same direction as this one, but length 1.
// console.log('.normalize():', mesh.position.normalize());

// You can change all three vector components by use .set()
// mesh.position.set(-2, 2, -6);

/* ----------------------------- look at object ----------------------------- */
// camera.lookAt(mesh.position);

/* ------------------------ combining transformations ----------------------- */

// These can be done in any order!!!!

/* ------------------------------- scene graph ------------------------------ */
// you can put objects inside groups and use position, rotation (or quaternion), and scale on those groups
// In order to do that we use the group class

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas,
});
renderer.setSize(sizes.width, sizes.height);
// Transformations can't go after the render
renderer.render(scene, camera);
