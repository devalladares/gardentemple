//	// PRESENTATION
const speederBoi = 300
// let presentation = false
presentation = true

// // // WORKING
// const speederBoi = 1400

////////////////// GLOBAL VARIABLES /////////////////
let xxx = 0
let mixer2
let time = 0;
//////////////////////////////
let rings = []
const grouper = new Group();
const ringRadius = 240;
const ringCount = 60
const ringNumber = 8
const ringPos = 400
const ringBallSize = 10
const yRingPos = 0
//////////////////////////////
const sphereCount = 12
const sphereDistance = 90
const sphereGap = 80
//////////////////////////////
const floors = []
let newFloor
const floorCount = 32
//////////////////////////////
let waterGardenSize = 1800
let waterGardenPos = 570
//////////////////////////////
let phase = 0;
let invert = 1;

let loadingManager

/////////////////////// INITIAL /////////////////////

function init() {

	camera = createCamera()
	scene = createScene()
	renderer = createRenderer();
	container.append(renderer.domElement);

	stats = new Stats();
	container.appendChild(stats.dom);

	window.addEventListener('resize', onWindowResize, false);

	loadingManager = new LoadingManager(() => {

		const loadingScreen = document.getElementById('loading-screen');
		loadingScreen.classList.add('fade-out');

		loadingScreen.addEventListener('transitionend', onTransitionEnd);

	});

	//////////////////// CONTROLS ////////////////////////

	controls = createControls(camera, document.body, presentation, music1, audioListener, scene, loadingManager);

	scene.add(controls.getObject());

	function onKeyDown(event) {
		switch (event.keyCode) {
			case 38: // up
			case 87: // w
				moveForward = true;
				break;
			case 37: // left
			case 65: // a
				moveLeft = true;
				break;
			case 40: // down
			case 83: // s
				moveBackward = true;
				break;
			case 39: // right
			case 68: // d
				moveRight = true;
				break;
			case 32: // space
				if (canJump === true) velocity.y += 350;
				canJump = false;
				break;
		}
	};

	function onKeyUp(event) {
		switch (event.keyCode) {
			case 38: // up
			case 87: // w
				moveForward = false;
				break;
			case 37: // left
			case 65: // a
				moveLeft = false;
				break;
			case 40: // down
			case 83: // s
				moveBackward = false;
				break;
			case 39: // right
			case 68: // d
				moveRight = false;
				break;
		}
	};

	document.addEventListener('keydown', onKeyDown, false);
	document.addEventListener('keyup', onKeyUp, false);
	raycaster = new Raycaster(new Vector3(), new Vector3(0, -1, 0), 0, 0);

	/////////////////////////////// LIGHTS /////////////////////////////

	scene.add(pointLight, pointLight2);
	scene.add(ambientLight);
	scene.add(sphereLightMesh, sphereLightMesh2);

	/////////////////////////////// WATER /////////////////////////////

	const water = createWater(scene, waterGardenSize, waterGardenPos)

	/////////////////////////////// BODYSPHERE /////////////////////////

	bodySphere = createBodySphere()
	bodySphere.position.copy(controls.getObject().position)
	camera.add(bodySphere);

	/////////////////////////////// TEXTURE

	starGroup = createStars(scene, starGroup)

	setLoop() //gltf

	createGarden(scene, waterGardenSize, waterGardenPos, loadingManager)

	createRing(scene, ringBallSize, ringCount, ringRadius, yRingPos, ringNumber, ringPos, rings, loadingManager)

	mainBase = createBaseCentre(mainBase, scene, loadingManager)

	mainCentre = createCentre(mainCentre, scene)

	createFloor(floorGroup, floorCount, scene, newFloor, floors, loadingManager)

	sphereGroup = createSpheres(scene, sphereGroup, sphereCount, sphereDistance, sphereGroup2, sphereGap, loadingManager)
	sphereGroup2 = sphereGroup.clone()
	sphereGroup2.position.x = -sphereDistance;
	scene.add(sphereGroup, sphereGroup2);
}

///////////////////////// FUNCTIONS /////////////////

function setLoop() {

	new RGBELoader()
		.setDataType(UnsignedByteType)

	const roughnessMipmapper = new RoughnessMipmapper(renderer);
	const textureLoader = new TextureLoader(loadingManager);
	const diffuseMap = textureLoader.load("textures/concrete/Concrete_012_COLOR.jpg",
		function(texture) {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.offset.set(0, 0);
			texture.repeat.set(1, 1);
		});
	const normalMap = textureLoader.load("textures/concrete/Concrete_012_NORM.jpg",
		function(texture) {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.offset.set(0, 0);
			texture.repeat.set(1, 1);
		});
	const aoMap = textureLoader.load("textures/concrete/Concrete_012_OCC.jpg",
		function(texture) {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.offset.set(0, 0);
			texture.repeat.set(1, 1);
		});

	let material = new MeshStandardMaterial({
		map: diffuseMap,
		normalMap: normalMap,
		aoMap: aoMap,
		// envMap: cubeMap,
		aoMapIntensity: 1,
		// roughnessMap: roughnessMap,
		metalness: 0.4
	});

	const loader = new GLTFLoader(loadingManager).setPath('examples/models/gltf/Temple/Test/');

	loader.load('rings5.gltf', function(gltf) {
		gltf.scene.traverse(function(child) {
			if (child.isMesh) {
				roughnessMipmapper.generateMipmaps(child.material);
				child.material = material
			}
		});

		const glScaler = 11
		gltf.scene.scale.set(glScaler, glScaler, glScaler);
		gltf.scene.position.set(0, 70, -1290)
		scene.add(gltf.scene);
		roughnessMipmapper.dispose();

		mixer2 = new AnimationMixer(gltf.scene);
		gltf.animations.forEach((clip) => {
			mixer2.clipAction(clip).play();
		});
		render();
	});

	// const loader3 = new  FontLoader();

	// loader3.load( 'textures/helvetiker_regular.typeface.json', function ( font ) {
	//
	// 	const geometry = new  TextGeometry( 'Hello three.js!', {
	// 		font: font,
	// 		size: 80,
	// 		height: 5,
	// 		curveSegments: 12,
	// 		bevelEnabled: true,
	// 		bevelThickness: 10,
	// 		bevelSize: 8,
	// 		bevelOffset: 0,
	// 		bevelSegments: 5
	// 	} );
	//
	//
	// } );

	//////////////////////////////
	//
	// const directionalLight = new DirectionalLight(0xffffff, 2);
	// directionalLight.position.set(0, 20, 0)
	// directionalLight.castShadow = true; // default false
	// scene.add(directionalLight);
	//
	// directionalLight.shadow.mapSize.width = 512; // default
	// directionalLight.shadow.mapSize.height = 512; // default
	// directionalLight.shadow.camera.near = 0.5; // default
	// directionalLight.shadow.camera.far = 500; // default
	//
	// const helper = new  CameraHelper( directionalLight.shadow.camera );
	// scene.add( helper );

//
// 	const loader2 = new GLTFLoader(loadingManager).setPath('examples/models/gltf/');
//
//
// 	loader2.load('Test19.glb', function(gltf) {
// 		gltf.scene.traverse(function(child) {
// 			// if (child.isMesh) {
// 			// 	roughnessMipmapper.generateMipmaps(child.material);
// 			// 	child.material = material
// 			// }
// 		});
//
// 		const glScaler = 20
// 		gltf.scene.scale.set(glScaler, glScaler, glScaler);
// 		gltf.scene.position.set(0, -0, 0)
// 		gltf.castShadow = true; //default is false
// 		gltf.receiveShadow = true; //default
//
//
//
// 		scene.add(gltf.scene);
// 		roughnessMipmapper.dispose();
//
// 		mixer2 = new AnimationMixer(gltf.scene);
// 		gltf.animations.forEach((clip) => {
// 			mixer2.clipAction(clip).play();
// 		});
// 		render();
// 	});
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function onTransitionEnd(event) {
	event.target.remove();
}

function animate() {
	requestAnimationFrame(animate);
	stats.update();
	render()
}

///////////////////////// RENDER ////////////////////

function render() {
	const performanceNow = performance.now();
	var delta2 = clock.getDelta();


	if (camera.position.z < -960 && mixer2) mixer2.update(delta2);


	let t = clock.getElapsedTime();

	if (controls.isLocked === true) {
		raycaster.ray.origin.copy(controls.getObject().position);
		raycaster.ray.origin.y -= 10;
		const intersections = raycaster.intersectObjects(objects);
		const onObject = intersections.length > 0;
		const delta = (performanceNow - prevTime) / 1000;
		velocity.x -= velocity.x * 5.0 * delta;
		velocity.z -= velocity.z * 5.0 * delta;
		direction.z = Number(moveForward) - Number(moveBackward);
		direction.x = Number(moveRight) - Number(moveLeft);
		direction.normalize(); // this ensures consistent movements in all directions
		if (moveForward || moveBackward) velocity.z -= direction.z * speederBoi * delta;
		if (moveLeft || moveRight) velocity.x -= direction.x * speederBoi * delta;
		controls.moveRight(-velocity.x * delta);
		controls.moveForward(-velocity.z * delta);
		controls.getObject().position.y += (velocity.y * delta); // new behavior
		if (controls.getObject().position.z > 350) {
			velocity.z = 0;
			controls.getObject().position.z = 350;
		}
		if (controls.getObject().position.x > 300) {
			velocity.x = 0;
			controls.getObject().position.x = 300;
		}
		if (controls.getObject().position.x < -300) {
			velocity.x = 0;
			controls.getObject().position.x = -300;
		}
	}

	for (let i = 0; i < starGroup.children.length; i++) {
		const object = starGroup.children[i];
		object.rotation.y = performanceNow * -0.000015
	}

	prevTime = performanceNow;
	bodySphere.position.set(0, 0, 0);

	const scale = (num, in_min, in_max, out_min, out_max) => {
		return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	}

	floors.forEach((element, i) => {
		distanceFloor = camera.position.distanceTo(element.position)
		floorLifter = scale(distanceFloor, 200, 100, -50, -39)
		floorLifter2 = floorLifter > -35 ? -35 : floorLifter < -50 ? -50 : floorLifter
		element.position.y = floorLifter2
	});

	sphereGroup.children.forEach((element, i) => {
		const object = sphereGroup.children[i];
		const object2 = sphereGroup2.children[i];
		object2.rotation.y -= Math.random() * (1 + i) * 0.01
		object.rotation.y += Math.random() * (1 + i) * 0.01
		object.position.y = Math.sin(t + i) * 1.5
		object2.position.y = Math.sin(t + i) * 1.5
	})

	if (phase > 2 * Math.PI) {
		invert = invert * -1;
		phase -= 2 * Math.PI;
	} else {
		phase += 0.005;
	}

	sphereLightMesh.position.z = +(100 * (Math.sin(-phase)));
	sphereLightMesh.position.x = -114 + (140 * (Math.cos(phase)));
	sphereLightMesh.position.y = Math.sin(phase) * 1.5;
	pointLight.position.copy(sphereLightMesh.position);

	sphereLightMesh2.position.z = Math.sin(phase) * 2
	sphereLightMesh2.position.x = -50 + (170 * (Math.cos(t / 10)));
	sphereLightMesh2.position.y = Math.sin(phase) * -1.2;
	pointLight2.position.copy(sphereLightMesh2.position);


	if (invert < 0) {
		var pivot = 0;
		sphereLightMesh.position.x = (invert * (sphereLightMesh.position.x - pivot)) + pivot;
		sphereLightMesh2.position.x = (invert * (sphereLightMesh2.position.x - pivot)) + pivot;
	}

	// let distanceCyl = camera.position.distanceTo(mainBase.position)
	// let cylLifter = scale(distanceCyl, 900, 375, -65, -50)
	// let cylLifter2 = cylLifter > -50 ? -50 : cylLifter < -65 ? -65 : cylLifter
	// mainBase.position.y = cylLifter2
	mainBase.rotation.y -= 0.0001
	mainCentre.rotation.y += 0.001


	rings.forEach((element, ndx) => {
		element.rotation.z += 0.00007 * (ndx / 2 + 1)

		let distance = camera.position.distanceTo(element.position)

		if (distance < 100) {

			let ringRotator2 = scale(distance, 100, 0, 0.0001, 0.0025)
			let ringRotator3 = ringRotator2 > 0.0025 ? 0.0025 : ringRotator2 < 0.0001 ? 0.0001 : ringRotator2
			element.rotation.z += ringRotator3

		} else {
			element.rotation.z += 0.0001
		}
	});

	renderer.render(scene, camera);

}

/////////////////////// VARIABLES ///////////////////

const audioListener = new AudioListener();
const music1 = new Audio(audioListener);
// const manager = new LoadingManager();

let {
	pointLight,
	pointLight2,
	sphereLight,
	ambientLight,
	sphereLightMesh,
	sphereLightMesh2
} = createLights();

let bodySphere
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let prevTime = performance.now();
const velocity = new Vector3();
const direction = new Vector3();
const vertex = new Vector3();

let camera, scene, renderer, composer, controls
let geometry, materialOptions, stats, container, starGroup, stars
let bodyLight, mixer
let clock = new Clock();
let sphereGroup, sphereGroup2, floorGroup
const objects = [];
let raycaster;
container = document.getElementById('container');

let distanceFloor
let floorLifter
let floorLifter2

let mainBase
let mainCentre
let ringGroupFlat, newRingFlat, ringsFlat, newRingF
let treeGroup, newTree
let trees = []
let distanceTree, treeSpinner, treeSpinner2

/////////////////////// INITIATE ///////////////////////

init();
animate();

/////////////////////// Import ///////////////////////

import {
	AnimationMixer,
	RepeatWrapping,
	UnsignedByteType,
	TextGeometry,
	Raycaster,
	Clock,
	Vector3,
	AudioListener,
	Audio,
	CameraHelper,
	FontLoader,
	AudioLoader,
	Object3D,
	LoadingManager,
	TextureLoader,
	MeshStandardMaterial,
	Group,
	DirectionalLight,
} from './build/three.module.js';
import Stats from './examples/jsm/libs/stats.module.js';

// import {
// 	PointerLockControls
// } from './examples/jsm/controls/PointerLockControlsPhone.js';
import {
	PointerLockControls
} from './examples/jsm/controls/PointerLockControls.js';

import {
	GUI
} from './examples/jsm/libs/dat.gui.module.js';
import {
	Water
} from './examples/jsm/objects/Water.js';
import {
	GLTFLoader
} from './examples/jsm/loaders/GLTFLoader.js';
import {
	RGBELoader
} from './examples/jsm/loaders/RGBELoader.js';
import {
	RoughnessMipmapper
} from './examples/jsm/utils/RoughnessMipmapper.js';
import {
	Sky
} from './examples/jsm/objects/Sky.js';
import {
	createRenderer
} from './src/system/renderer.js';
import {
	createCamera
} from './src/components/camera.js';
import {
	createBodySphere
} from './src/components/bodySphere.js';
import {
	createWater
} from './src/components/water.js';
import {
	createSpheres
} from './src/components/spheres.js';
import {
	createBaseCentre,
} from './src/components/centreBase.js';
import {
	createCentre,
} from './src/components/centreMain.js';
import {
	createFloor,
} from './src/components/floor.js';
import {
	createRing,
} from './src/components/rings.js';
import {
	createGarden
} from './src/components/garden.js';
import {
	createStars
} from './src/components/stars.js';
import {
	createLights
} from './src/components/lights.js';
import {
	createScene
} from './src/components/scene.js';
import {
	createControls
} from './src/system/controls.js';
