const canvas = document.querySelector('.webgl');

/* --------------------------- Create a new scene --------------------------- */
const scene = new THREE.Scene();

/* --------------------------- Create some objects -------------------------- */
// First let's create the geometry for the Red Cube
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Then we need to create the material
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Then finally we create the mesh
const mesh = new THREE.Mesh(geometry, material);

// Add the mesh to the scene
scene.add(mesh);

/* ---------------------- Create and adjust the camera ---------------------- */
// Create the size for the aspect ratio
const sizes = {
    width: 800,
    height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// Move the camera
camera.position.z = 3;

scene.add(camera);

/* ------------------- We now need to create the renderer ------------------- */
const renderer = new THREE.WebGLRenderer({
    canvas,
});

// Resize the renderer
renderer.setSize(sizes.width, sizes.height);

/* --------------------------- Do our first render -------------------------- */
renderer.render(scene, camera);
