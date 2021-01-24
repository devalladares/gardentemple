import {
	DirectionalLight,
	HemisphereLight,
	AmbientLight,
	PointLight,
	SphereGeometry,
	MeshStandardMaterial,
	Mesh
} from '../../build/three.module.js';

function createLights() {

	const sphereLightMaterial = new MeshStandardMaterial({
		color: 'white'
	});

	const ambientLight = new AmbientLight('white', .8); // soft white light
	ambientLight.physicallyCorrectLights = true

	const pointLight = new PointLight("white");
	pointLight.intensity = 0.5
	pointLight.physicallyCorrectLights = true

	const pointLight2 = new PointLight("white");
	pointLight2.intensity = 0.5
	pointLight2.physicallyCorrectLights = true


	const sphereLight = new SphereGeometry(1, 2, 2);
	sphereLight.physicallyCorrectLights = true


	const sphereLightMesh = new Mesh(sphereLight, sphereLightMaterial);
	const sphereLightMesh2 = new Mesh(sphereLight, sphereLightMaterial);
	sphereLightMesh.physicallyCorrectLights = true
	sphereLightMesh2.physicallyCorrectLights = true

	return {
		ambientLight,
		pointLight,
		pointLight2,
		sphereLight,
		sphereLightMesh,
		sphereLightMesh2
	};
}

export {
	createLights
};
