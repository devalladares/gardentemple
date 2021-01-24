import {
	TorusBufferGeometry,
	MeshBasicMaterial,
	Mesh,
} from '../../build/three.module.js';



function createCentre(mainCentre, scene) {

	const radius = 100
	const tube = 38.2
	const radialSegments = 64
	const tubularSegments = 150

	const geometry = new TorusBufferGeometry(radius, tube, radialSegments, tubularSegments);
	const material = new MeshBasicMaterial({
		color: 'white'
	});
	mainCentre = new Mesh(geometry, material);

	mainCentre.position.z = -1295
	mainCentre.position.y = 100

	scene.add(mainCentre);

	return mainCentre
}


export {
	createCentre,
}
