# Three.js Journey

## Contents

[return to contents](../../../README.md)

## Introduction

We created a scene that we rendered once at the end of our code. That is already good progress, but most of the time, you'll want to animate your creations.

Animations, when using Three.js, work like stop motion. You move the objects, and you do a render. Then you move the objects a little more, and you do another render. Etc. The more you move the objects between renders, the faster they'll appear to move.

The native JavaScript way of doing so is by using the `window.requestAnimationFrame(...)` method.

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

## Using requestAnimationFrame

The primary purpose of **requestAnimationFrame** is not to run code on each frame.

`requestAnimationFrame` will execute the function you provide `on the next frame`. This process will recursively run the function forever, which is what we want.

Let's have a look at an example:

```JavaScript
const tick = () =>
{
    console.log('tick')

    window.requestAnimationFrame(tick)
}

tick()
```

There's the infinite loop.

As you can see on the console, the `'tick'` is being called on each frame. If you test this code on a computer with a high frame rate, the `'tick'` will appears at a higher frequency.

Let's move the `renderer.render(...)` inside the tick function and rotate it:

```JavaScript
const tick = () =>
{
    // Update objects
    mesh.rotation.y += 0.01

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
```

### Adaptation to the Framerate

Obviously we want to make sure the framerate is the same on all devices. Most screens have a refresh rate of 60hz which will be the frame rate that we want to target.

Here's a method using native JavaScript to target a consistent framerate.

```JavaScript
let time = Date.now()

const tick = () =>
{
    // Time
    const currentTime = Date.now()
    const deltaTime = currentTime - time
    time = currentTime

    // Update objects
    mesh.rotation.y += 0.01 * deltaTime

    // ...
}

tick()
```

Now that we base our rotation on how much time was spent since the last frame, This rotation speed will be the same on every screen and every computer regardless of the frame rate.

## Using Clock

While this code isn't that complicated, there is a built-in solution in Three.js named `Clock` that will handle the time calculations.

You simply have to instantiate a `Clock` variable and use the built-in methods like `getElapsedTime()`. This method will return how many seconds have passed since the `Clock` was created.

You can use this value to rotate the object:

```JavaScript
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    mesh.rotation.y = elapsedTime

    // ...
}

tick()
```
