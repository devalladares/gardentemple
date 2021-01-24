import {
	SphereBufferGeometry,
	TextureLoader,
	MeshStandardMaterial,
	Mesh,
	RepeatWrapping,
	AnimationMixer,
	Object3D

} from '../../build/three.module.js';

import {
	GLTFLoader
} from '../../../examples/jsm/loaders/GLTFLoader.js';

import {
	RoughnessMipmapper
} from '../../../examples/jsm/utils/RoughnessMipmapper.js';

function createRing(scene, ringBallSize, ringCount,  ringRadius, yRingPos, ringNumber, ringPos, rings, loadingManager) {

	let ringGroup = new Object3D();
	const geometry = new SphereBufferGeometry(ringBallSize, 24, 24)

	const textureLoader = new TextureLoader(loadingManager);

	const diffuseMap = textureLoader.load("textures/concrete/Concrete_012_COLOR.jpg");
	const normalMap = textureLoader.load("textures/concrete/Concrete_012_NORM.jpg");
	const aoMap = textureLoader.load("textures/concrete/Concrete_012_OCC.jpg");
	const displacementMap = textureLoader.load("textures/concrete/Concrete_012_DISP.jpg");
	const roughnessMap = textureLoader.load("textures/concrete/Concrete_012_ROUGH.jpg");

	let material = new MeshStandardMaterial({
		map: diffuseMap,
		normalMap: normalMap,
		aoMap: aoMap,
		// envMap: cubeMap,
		// aoMapIntensity: 1,
		roughnessMap: roughnessMap,
		// displacementMap: displacementMap,
		// metalness: metalnessMap,
		// alphaMap: alphaMap,
		metalness: 0.1,
	});

	const mainMesh = new Mesh(geometry, material)

	for (let i = 0; i < ringCount; i++) {
		const mesh = mainMesh.clone();
		const t = i / ringCount * 2 * Math.PI
		mesh.position.x = Math.cos(t) * ringRadius;
		mesh.position.y = Math.sin(t) * ringRadius;
		ringGroup.add(mesh)
	}
	ringGroup.position.set(0, yRingPos, -500)

	for (let j = 0; j < ringNumber; j++) {
		addRing((j * -30) - ringPos)
	}

	function addRing(j) {
		let newRing = ringGroup.clone()
		newRing.position.z = j
		newRing.rotation.z = j
		rings.push(newRing)
		scene.add(newRing)
	}
}

export {
	createRing,
}
