# Three.js Journey

## Introduction

We already created a `PerspectiveCamera`, but there are other types of cameras, as you can see in the documentation.

## Contents

[return to contents](../../../README.md)

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

```bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

## Types of Cameras

### Camera

The `Camera` class is what we call an abstract class. You're not supposed to use it directly, but you can inherit from it to have access to common properties and methods. Some of the following classes inherit from the `Camera` class.

### ArrayCamera

The `ArrayCamera` is used to render your scene multiple times by using multiple cameras. Each camera will render a specific area of the canvas. You can imagine this looking like old school console multiplayer games where we had to share a split-screen.

### StereoCamera

The `StereoCamera` is used to render the scene through two cameras that mimic the eyes in order to create what we call a parallax effect that will lure your brain into thinking that there is depth. You must have the adequate equipment like a VR headset or red and blue glasses to see the result.

### CubeCamera

The `CubeCamera` is used to get a render facing each direction (forward, backward, leftward, rightward, upward, and downward) to create a render of the surrounding. You can use it to create an environment map for reflection or a shadow map. We'll talk about those later.

### OrthographicCamera

The `OrthographicCamera` is used to create orthographic renders of your scene without perspective. It's useful if you make an RTS game like Age of Empire. Elements will have the same size on the screen regardless of their distance from the camera.

### PerspectiveCamera

The `PerspectiveCamera` is the one we already used and simulated a real-life camera with perspective. We are going to focus on the `OrthographicCamera` and the `PerspectiveCamera`.

## PerspecitiveCamera

The `PerspectiveCamera` needs some parameters to be instantiated, but we didn't use all of them.

```JavaScript
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)
```

### Field of View

The first parameter called field of view corresponds to your camera view's vertical amplitude angle in degrees. If you use a small angle, you'll end up with a long scope effect, and if you use a wide-angle, you'll end up with a fish eye effect because, in the end, what the camera sees will be stretched or squeezed to fit the canvas.

A common field of of view is somewhere between `75` and `45`.

### Aspect Ratio

The second parameter is called **aspect ratio** and corresponds to the width divided by the height. While you might think that it's obviously the canvas width by the canvas height and Three.js should calculate it by itself, it's not always the case if you start using Three.js in very specific ways. But in our case, you can simply use the canvas width and the canvas height.

Save the values multiple times like so:

```JavaScript
const sizes = {
    width: 800,
    height: 600
}
```

### Near and Far

The third and fourth parameters called near and far, correspond to how close and how far the camera can see. Any object or part of the object closer to the camera than the `near` value or further away from the camera than the `far` value will not show up on the render.

You can see that like in those old racing games where you could see the trees pop up in the distance.

While you might be tempted to use very small and very large values like `0.0001` and `9999999` you might end up with a bug called **z-fighting** where two faces seem to fight for which one will be rendered above the other.

Use reasonable values like `0.1` and `100` and only increase as needed.

## OrthographicCamera

The `OrthographicCamera` differs from the `PerspectiveCamera` by its lack of perspective, meaning that the objects will have the same size regardless of their distance from the camera.

The parameters you have to provide are very different from the `PerspectiveCamera`.

Instead of a field of view, you must provide how far the camera can see in each direction (`left`, `right`, `top` and `bottom`). Then you can provide the `near` and `far` values just like we did for the **PerspectiveCamera**.

We need to use the canvas ratio (width by height). Let's create a variable named `aspectRatio` (just like the `PerspectiveCamera`) and store that ratio in it:

```JavaScript
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)
```

## Custom Controls

Looking at the `PerspectiveCamera`, what we want to do now is control the camera with our mouse. First of all, we want to know the mouse coordinates. We can do that using native JavaScript by listening to the `mousemove` event with `addEventListener`.

The coordinates will be located in the argument of the callback function as `event.clientX` and `event.clientY`:

```JavaScript
// Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5

    console.log(cursor.x, cursor.y)
})
```

Then we can update the camera with fully circular movements by using a little bit of trigonometry

```JavaScript
const tick = () =>
{
    // ...

    // Update camera
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    camera.position.y = cursor.y * 3
    camera.lookAt(mesh.position)

    // ...
}

tick()
```

## Built in Controls

While it can be useful to create your own camera controls, more often than not you can use the built in classes that help you do the same and much more.

You can view all camera controls by looking at the [three.js docs](https://threejs.org/docs/index.html?q=contro#examples/en/controls/OrbitControls) and typing in **control** in the search bar.

## OrbitControls

OrbitControls is probably the go to camera control that you'll be using mostly.

### Instantiating

First, we need to instantiate a variable using the `OrbitControls` class:

```JavaScript
// Controls
const controls = new OrbitControls(camera, canvas)
```

You can now drag and drop using both the left mouse or the right mouse to move the camera, and you can scroll up or down to zoom in or out.

It's much easier than our custom code, and it comes with more controls. But let's go a little further.

### Target

You can update what the orbit focuses on by changing the target properties:

```JavaScript
controls.target.y = 2
controls.update()
```

Not useful in this instance so we're not going to use it.

### Damping

If you read the documentation of **OrbitControls** there are mentions of `damping`. The damping will smooth the animation by adding some kind of acceleration and friction formulas.

To enable damping, switch the `enableDamping` property of `controls` to `true`.

In order to work properly, the controls also needs to be updated on each frame by calling `controls.update()`. You can do that on the `tick` function:

```JavaScript
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// ...

const tick = () =>
{
    // ...

    // Update controls
    controls.update()

    // ...
}
```
