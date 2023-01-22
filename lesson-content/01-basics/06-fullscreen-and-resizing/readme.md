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
}
```
