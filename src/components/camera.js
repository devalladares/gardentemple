import {
	PerspectiveCamera
} from '../../build/three.module.js';

function createCamera() {

	const cameraSetter = 250
	const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 5, 1000);
	camera.position.set(0, 0, 150)
	camera.position.set(0, 0, cameraSetter)

	return camera
}

export {
	createCamera
}
