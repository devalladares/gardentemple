import {
	PointerLockControls
} from '../../examples/jsm/controls/PointerLockControls.js';

import {
	AudioLoader
} from '../../build/three.module.js';

let controls
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let loaded = false

function createControls(camera, canvas, presentation, music1, audioListener, scene, loadingManager) {

	controls = new PointerLockControls(camera, canvas);
	const instructions = document.getElementById('instructions');



	instructions.addEventListener('click', function() {
		controls.lock();
	}, false);

	controls.addEventListener('lock', function() {
		instructions.style.display = 'none';
		blocker.style.display = 'none';

		// console.log(blocker)

		if (presentation === true && loaded === false) {
			camera.add(audioListener);
			scene.add(music1);

			const loaderAudio = new AudioLoader();

			loaderAudio.load(
				'audio/devmusic9.mp3',
				function(audioBuffer) {
					music1.setBuffer(audioBuffer);
					music1.play()
					music1.setLoop(true);
					let loopingEnabled = music1.loop;
					music1.loop = true
					loaded = true
				},
				function(xhr) {
					console.log((xhr.loaded / xhr.total * 100) + '% loaded');
				},
				function(err) {
					console.log('An error happened');
				});
		} else if (presentation === true && loaded === true) {
			music1.play()
			music1.loop = true
		}
	});

	controls.addEventListener('unlock', function() {
		blocker.style.display = 'block';
		instructions.style.display = '';
		// music1.pause()
	});

	return controls
}

export {
	createControls,
};
