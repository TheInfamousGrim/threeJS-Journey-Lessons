# 01 Basic Scene

## Contents

[return to contents](../../../README.md)

## Description

We're just going through a very basic setup of Three.JS and rendering a square using the canvas element.

## Contents

1. [How To Load ThreeJS](#how-to-load-threejs)
2. [How to Use Three.JS](#how-to-use-threejs)

## How To Load Three.JS

You can go to [threeJS.org](https://threejs.org/) to download a minified version of the javascript.

## How to Use Three.JS

In the `script.js` file, we have access to a variable named `THREE` (Make sure to always use this in uppercase).

`THREE` is an object which contains classes that give you access to various methods and values.

## First Scene

We need 4 elements to create a basic scene

- A scene that will contain objects
- Some objects
- A camera
- A renderer

### Scene

The scene is the container of all your objects, cameras, models, lights etc. This is what will get rendered when you finally decide to render

```JavaScript
const scene = new THREE.Scene();

```

### Objects

Objects can be all sorts of different things. You can have primitive geometries, imported models, particles, lights, and so on from programs like blender or Maya.

First we'll start off with a primitive red cube.

To create the cube we need to create the **Mesh**. The **Mesh** is the combination of a geometry (the shape) and a material (how it looks).

For this exercise we're just using a **BoxGeometry** and a **MeshBasicMaterial**.

```JavaScript
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

```

To create the final, we use the **Mesh** class and send the `geometry` and `material` as parameters.

```JavaScript
const mesh = new THREE.Mesh(geometry, materail);
```

Make sure to add the mesh to the scene!

```JavaScript
scene.add(mesh);
```

If you don't add the mesh to the scene it won't show up.

### Camera

Just like in 3D software you always need a camera otherwise your objects and scene will not be visible. The final render will be from the cameras point of view.

You can have multiple cameras, just like when filming a movie; however that's unusual, and its normal to just have one.

For now we're just using a camera that handles perspective (making close objects look more prominent than far objects).

To create the camera, we use **PerspectiveCamera**.

**The Field of View**

This is how large the vision angle is. If you FOV is large then you'll be able to see in nearly every direction at once but have a very distorted view of the objects. If you use a small angle then everything will looked zoomed in.

FOV is expressed in degrees and corresponds to the vertical vision angle. In this exercise we use `75` degrees as the FOV.

**The Aspect Ratio**

In pretty much all cases the aspect ratio is the width of the canvas divided by its height.

```JavaScript
// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)
```

### Renderer

The renderer generates a photorealistic or non-photorealistic image from a 2D or 3D model by means of a computer program.

Make sure that the `<canvas>` element is created **before** you load the scripts and give it a class:

```HTML
<canvas class="webgl"></canvas>
```

To create the renderer, we use the **WebGLRenderer** class with one paramenter: and object `{}` containing all the options. We need to specify the `canvas` property corresponding to the `<canvas>` element we added to the page.

It's better to assign the canvas selection to a variable because we'll use it for other purposes in the next lessons.

We also need to update the size of your renderer with the `setSizes(...)` method using the `sizes` object we created earlier. This will automatically resize the `<canvas>` accordingly:

```JavaScript
// Canvas
const canvas = document.querySelector('canvas.webgl');

// ...

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
```

## First Render

Now let's make the first render! Call the `render(...)` method on the renderer and send it the `scene` and `camera` as parameters:

```JavaScript
renderer.render(scene, camera);
```

You're still not going to see something as the camera is in the exact same position as the object. So we need to move the camera.

In order to make the object visible we can manipulate different transformational properties on either the object or the camera. These properties are `position`, `rotation` and `scale`.

All we need to do in this instance is move the camera backwards along the `z` axis. By defalut Three.js considers the forward/backward axis to be the `z` axis.

So all we need to do is add one line of code before we add the camera to the scene.

```JavaScript
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
```

Bing Band bong! You now have done your first render!
