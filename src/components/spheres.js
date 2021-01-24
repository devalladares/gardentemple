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

function createSpheres(scene, sphereGroup, sphereCount, sphereDistance, sphereGroup2, sphereGap,loadingManager) {

	sphereGroup = new Object3D();

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

	const sphereGeometry = new SphereBufferGeometry(10, 24, 24);

	const hoverSphere = new Mesh(
		sphereGeometry,
		material
	)

	hoverSphere.castShadow = true;
	hoverSphere.receiveShadow = false; //default


	for (let i = 0; i < sphereCount; i++) {
		const mesh = hoverSphere.clone();

		mesh.position.z = i * -sphereGap;
		sphereGroup.add(mesh)
	}
	sphereGroup.position.set(0, 0, 0)
	sphereGroup.position.y = -20;
	sphereGroup.position.z = 110;
	sphereGroup.position.x = sphereDistance;



	return sphereGroup

}

export {
	createSpheres
}
