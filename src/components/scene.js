import {
	Color,
	Scene,
	FogExp2
} from '../../build/three.module.js';

function createScene() {

	const scene = new Scene()
	scene.background = new Color('black');
	scene.fog = new FogExp2('black', 0.0025);

	return scene
}

export {
	createScene
}
