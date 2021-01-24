import {
	PlaneBufferGeometry,
	TextureLoader,
	RepeatWrapping,
	Vector3
} from '../../build/three.module.js';

import {
	Water
} from '../../examples/jsm/objects/Water.js';

function createWater(scene, waterGardenSize, waterGardenPos) {

	const waterGeometry = new PlaneBufferGeometry(180 * 2, waterGardenSize);

	const water = new Water(
		waterGeometry, {
			textureWidth: 512,
			textureHeight: 512,
			waterNormals: new TextureLoader().load('examples/jsm/textures/waternormals.jpg', function(texture) {
				texture.wrapS = texture.wrapT = RepeatWrapping;
			}),
			alpha: 1.0,
			sunDirection: new Vector3(),
			sunColor: 'white',
			waterColor: 0x001e0f,
			distortionScale: 3.7,
			fog: scene.fog !== undefined
		}
	);

	water.rotation.x = -Math.PI / 2;
	water.position.y = -50
	water.position.z = -waterGardenPos

	scene.add(water);
}

export {
	createWater
}
