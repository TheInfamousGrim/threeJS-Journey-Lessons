# 03 Transform Objects

There 4 properties to transform objects in our scene:

- `position` (to translate the object)
- `scale` (to resize the object)
- `rotation` (to rotate the object)
- `quaternion` (to also rotate the object; Gets rid of gimbal lock bug )

All of these properties will be compiled into matrices. Matrices are used internally by Three.js, by the WebGL, and by the GPU to transform things. Fortunately, you don't have to handle matrices by yourself and you can just modify the previously-mentioned properties.

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

## Translate Objects

You can move objects by using the following properties.

```JavaScript
mesh.position.x = 0.7
mesh.position.y = - 0.6
mesh.position.z = 1
```

The three axis as shown are `x`, `y` and `z`. These three axes and the units associated will make up the vector which will be used to calculate where to move your object or camera.

The units are arbitrary and you can define them however you like. So you could decide that the 1 might be a **metre** if your building a house, or a **centimeter** if your making a pencil sharpener.

MAKE SURE YOU DO ALL OF THESE TRANSFORMATIONS BEFORE YOUR RENDER.

The `position` property is an instance of the **Vector3** class.

### Useful Position Methods

You can get the length of a vector:

```JavaScript
console.log(mesh.position.length())
```

You can get the distance from another **Vector3** (make sure to use this code after creating the camera)

```JavaScript
console.log(mesh.position.distanceTo(camera.position))
```

You can normalize its values (meaning the will reduce the length of the vector to `1` unit but preserve its direction)

```JavaScript
console.log(mesh.position.normalize())
```

Change all of the axes (`x`, `y` and `z`) at once using the `set(...)` method:

```JavaScript
mesh.position.set(0.7, - 0.6, 1)
```

## Axes Helper

Just like when you use 3D software, you can instantiate an **AxesHelper** which will display the different axes as vectors with **green** representing the `y`, **red** the `x` and **blue** the `z`.

To create the **AxesHelper** simply do the following:

```JavaScript
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)
```

## Scale Objects

`scale` is also a **Vector3**. You can scale objects in a similar fashion to translating them.

```JavaScript
mesh.scale.x = 2
mesh.scale.y = 0.25
mesh.scale.z = 0.5
```

Much like the axes helper you can use `set(...)` to scale in all three directions at the same time.

## Rotate Objects

Rotation can be a little bit more tricksy. You can rotate in two different ways.

### Rotation

The `rotation` property also has `x`, `y` and `z` but instead of being **Vector3** properties they are **Euler Angles**. Think of the the axis of rotation in a plane.

- If you spin on the `x` axis you'll pitch the plane up or down.
- If you spin on the `y` axis you'll yaw the plane right or left.
- If you spin on the `z` axis you'll roll the plane clockwise or anticlockwise.

The **Euler** angles are expressed in radians rather than degrees. But we can use the built in Math object to get **pi** using `Math.PI` to get half turns or quarter turns etc.

```JavaScript
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25
```

is it easy? Yes, but when you combine those rotations, you might end up with strange results. Why? Because, while you rotate the `x` axis, you also change the other axes' orientation. The rotation applies in the following order: `x`, `y`, and then `z`. That can result in weird behaviors like one named gimbal lock when one axis has no more effect, all because of the previous ones.

We can change this order by using the `reorder(...)` method `object.rotation.reorder('YXZ')`.

While **Euler** is easier to understand, this order problem can cause issues. And this is why most engines and 3D softwares use another solution named **Quaternion**.

### Quaternion

The **quaternion** property also expresses a rotation, but in a more mathematical way, which solves the order problem.

We will not cover how **quaternions** work in this lesson but keep in mind that the **quaternion** updates when you change the **rotation**. This means that you can use any one of the two as you please.

### Look at This

**Object3D** instances have a fab method named `lookAt(...)` that lets you look at whatever arguments are passed into the method. The argument can be a newly instantiated **Vector3**:

```JavaScript
camera.lookAt(new THREE.Vector3(0, - 1, 0))
```

Or they can be an existion postion, like the mesh that we've made:

```JavaScript
camera.lookAt(mesh.position)
```

## Combining Transformations

You can combine all of these different transformational properties together to effectively move your object or camera through 3D space.

```JavaScript
mesh.position.x = 0.7
mesh.position.y = - 0.6
mesh.position.z = 1
mesh.scale.x = 2
mesh.scale.y = 0.25
mesh.scale.z = 0.5
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25
```

## Scene Graph

At some point you're going to want to group together meshes so that they can be transformed together. Maybe you have a house and you realize its too small and you need to resize it. This is the perfect example of when to group all the meshes together so that you can make the house larger.

The process for creating a group is as follows:

```JavaScript
const group = new THREE.Group()
group.scale.y = 2
group.rotation.y = 0.2
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube1.position.x = - 1.5
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube2.position.x = 0
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube3.position.x = 1.5
group.add(cube3)
```
