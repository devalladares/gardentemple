import {
	WebGLRenderer,
	PCFSoftShadowMap
} from '../../build/three.module.js';


function createRenderer() {

	const renderer = new WebGLRenderer({
		// antialias: true
	})

	const minpixelRatio = 1.75
	const pixelRatio = Math.min(minpixelRatio, window.devicePixelRatio)
	renderer.setPixelRatio(pixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	// renderer.setClearColor('rgb(120, 120, 120)');
	renderer.shadowMap.enabled = true;
	// document.body.appendChild(renderer.domElement);
	renderer.shadowMap.type =  PCFSoftShadowMap; // default THREE.PCFShadowMap


	return renderer
}

export {
	createRenderer
}
