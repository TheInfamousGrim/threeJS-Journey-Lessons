# Three.js Journey

## Contents

[return to contents](../../../README.md)

## Introduction

Our canvas currently has a fixed resolution of `800x600`. You don't necessarily need your WebGL to fit the whole screen, but if you want an immersive experience, it might be better.

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

## Fit in the Viewport

To start with you need to adjust the `sizes` object:

```JavaScript
// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
```

This gets most of the way there. But you'll need to normalize some stylings and get rid of the margin around the html and body elements

You can either use [modern-normalize](https://github.com/sindresorhus/modern-normalize), or:

```CSS
*
{
    margin: 0;
    padding: 0;
}
```

Then you just need to make the `canvas` element a fixed element by using the `webgl` class:

```CSS
.webgl
{
    position: fixed;
    top: 0;
    left: 0;
    outline: none;
}
```

Then if you want to remove any type of scrolling add this CSS:

```CSS
html,
body
{
    overflow: hidden;
}
```

## Handle resize

In order to update the size of the render you need to add **window resize event listener and event handler**

Within that event handler we need to do 3 things:

1. Update the sizes object so that the width and height are the same as the window width and height.
2. Update the aspect ratio for the camera
3. Update the size of the renderer

Here's the code that you need to use to implement that:

```JavaScript
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
})
```

## Handle Pixel Ratio

Some of you might see a kind of blurry render and artifacts shaped likes stairs on the edges (called aliasing), but not all of you. If you do, it's because you are testing on a screen with a pixel ratio greater than `1`.

Basically the pixel ratio is how many physical pixels you have on the screen for one pixel unit of the software part.

### Handle the Pixel Ratio

We pretty much want to ensure that the pixel ratio never gets above 2, as this will massively hit the performance of our renders.

We just need to add this line of code to our resize event handler:

```JavaScript
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    // ------ HERE'S THE PIXEL RATIO CODE ------//
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
```

## Handle Fullscreen

We're going to implement a feature where if we double click anywhere in the render then the application will go into fullscreen mode.

Unfortunately because safari is slow on the uptake, what should be a simple couple of lines of code has to be a little bit more convoluted.

Here's the code for enabling fullscreen mode across all browsers:

```JavaScript
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})
```
