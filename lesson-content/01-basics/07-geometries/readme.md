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
