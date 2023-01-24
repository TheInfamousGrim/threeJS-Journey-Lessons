# Three.js Journey

## Contents

[return to contents](../../../README.md)

## Introduction

Until now, we only used the `BoxGeometry` class to create our cube. In this lesson, we will discover various other geometries, but first, we need to understand what a geometry really is.

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

## What is a Geometry

In Three.js, geometries are composed of vertices (point coordinates in 3D spaces) and faces (triangles that join those vertices to create a surface).

We use geometries to create meshes, but you can also use geometries to form particles. Each vertex (singular of vertices) will correspond to a particle, but this is for a future lesson.

We can store more data than the position in the vertices. A good example would be to talk about the UV coordinates or the normals. As you'll see, we will learn more about those later.

## Different Built-in Geometries

Three.js has plenty of different built-in geometries. You don't need to memorize all of them, but it's good to know they exist.

All the built-in geometries we are going to see inherit from the `BufferGeometry` class. This class has many built in methods like `translate(...)`, `rotateX(...)`, `normalize()`, etc. but we are not going to use them in this lesson.

To see all of the different geometries in action go to [three.js docs](https://threejs.org/docs/?q=Geometry#api/en/geometries/BoxGeometry) and type in **Geometry** to get a full list of all the available geometries.

## Box Example

The **BoxGeometry** has 6 parameters:

- width: The size on the x axis
- height: The size on the y axis
- depth: The size on the z axis
- widthSegments: How many subdivisions in the x axis
- heightSegments: How many subdivisions in the y axis
- depthSegments: How many subdivisions in the z axis

Subdivisions correspond to how much triangles should compose the face. By default it's 1, meaning that there will only be 2 triangles per face. If you set the subdivision to 2, you'll end up with 8 triangles per face:

```JavaScript
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
```

## Creating your own Buffer Geometry

To create your own buffer geometry, start by instantiating an empty **BufferGeometry**. We will create a simple triangle:

To add vertices to a **BufferGeometry** you must start with a **Float32Array**.

**Float32Array** are native JavaScript typed array. You can only store floats inside, and the length of that array is fixed.

To create a **Float32Array**, you can specify its length and fill it in later or my preferred method:

```JavaScript
const positionsArray = new Float32Array([
    0, 0, 0, // First vertex
    0, 1, 0, // Second vertex
    1, 0, 0  // Third vertex
])
```

In total to render custom geometry here's the rest of the code:

```JavaScript
// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry()

// Create a Float32Array containing the vertices position (3 by 3)
const positionsArray = new Float32Array([
    0, 0, 0, // First vertex
    0, 1, 0, // Second vertex
    1, 0, 0  // Third vertex
])

// Create the attribute and name it 'position'
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)
```

Just for fun you can even create a bunch of different triangles of random coordinates:

```JavaScript
// Create an empty BufferGeometry
const geometry = new THREE.BufferGeometry()

// Create 50 triangles (450 values)
const count = 50
const positionsArray = new Float32Array(count * 3 * 3)
for(let i = 0; i < count * 3 * 3; i++)
{
    positionsArray[i] = (Math.random() - 0.5) * 4
}

// Create the attribute and name it 'position'
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)
```
