import {
	SphereBufferGeometry,
	TextureLoader,
	RepeatWrapping,
	MeshStandardMaterial,
	BoxBufferGeometry,
	Mesh,
	Object3D,
	CylinderBufferGeometry,
	MeshBasicMaterial

} from '../../build/three.module.js';

function createFloor(floorGroup, floorCount, scene, newFloor, floors,loadingManager) {

	const textureLoader = new TextureLoader(loadingManager);
	const diffuseMap = textureLoader.load("textures/concrete_dark/Concrete_Wall_002_basecolor.jpg",
		function(texture) {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.offset.set(0, 0);
			texture.repeat.set(2, 1);
		});
	const normalMap = textureLoader.load("textures/concrete_dark/Concrete_Wall_002_normal.jpg",
		function(texture) {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.offset.set(0, 0);
			texture.repeat.set(2, 1);
		});
	const aoMap = textureLoader.load("textures/concrete_dark/Concrete_Wall_002_ambient_occlusion.jpg",
		function(texture) {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.offset.set(0, 0);
			texture.repeat.set(2, 1);
		});
	const displacementMap = textureLoader.load("textures/concrete_dark/Concrete_Wall_002_height.jpg",
		function(texture) {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.offset.set(0, 0);
			texture.repeat.set(2, 1);
		});
	const roughnessMap = textureLoader.load("textures/concrete_dark/Concrete_Wall_002_roughness.jpg",
		function(texture) {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.offset.set(0, 0);
			texture.repeat.set(2, 1);
		});

	let material = new MeshStandardMaterial({
		map: diffuseMap,
		normalMap: normalMap,
		aoMap: aoMap,
		aoMapIntensity: 1,
		roughnessMap: roughnessMap,
		metalness: 0
	});

	const boxBufferGeometry = new BoxBufferGeometry(80, 30, 4);

	const floor = new Mesh(
		boxBufferGeometry,
		material
	)

	floor.receiveShadow = true;
	floorGroup = new Object3D();
	floorGroup.add(floor)
	floorGroup.rotation.x = Math.PI / 2;
	floorGroup.position.set(0, -40, 0)

	for (let j = 0; j < floorCount; j++) {
		addFloor((j * -33) + 100)
	}

	function addFloor(j) {
		newFloor = floorGroup.clone()
		newFloor.position.z = j
		floors.push(newFloor)
		scene.add(newFloor)
	}

	const radius = 80
	const geometry = new CylinderBufferGeometry(radius, radius, 20, 64);
	const material2 = new MeshBasicMaterial({
		color: 0xffff00
	});
	const floorBase = new Mesh(geometry, material);
	scene.add(floorBase);

	floorBase.position.z = 200
	floorBase.position.y = -50
}

export {
	createFloor
}
