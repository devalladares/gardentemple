import {
	TextureLoader,
	Shape,
	MeshStandardMaterial,
	Path,
	ExtrudeGeometry,
	Mesh,
	RepeatWrapping,
} from '../../build/three.module.js';



function createBaseCentre(mainBase, scene,loadingManager) {


	const outerRadius = 350
	const innerRadius = 175
	const height = 25

	const textureLoader = new TextureLoader(loadingManager);
	textureLoader.setCrossOrigin("");
	const diffuseMap = textureLoader.load("textures/tiles/Portuguese_Floor_001_COLOR.jpg",
		function(texture) {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.offset.set(0, 0);
			texture.repeat.set(.05, .05);
		});
	const normalMap = textureLoader.load("textures/tiles/Portuguese_Floor_001_NORM.jpg",
		function(texture) {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.offset.set(0, 0);
			texture.repeat.set(.05, .05);
		});
	const aoMap = textureLoader.load("textures/tiles/Portuguese_Floor_001_OCC.jpg",
		function(texture) {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.offset.set(0, 0);
			texture.repeat.set(.05, .05);
		});

	const textureLoader2 = new TextureLoader();
	textureLoader.setCrossOrigin("");
	const diffuseMap2 = textureLoader.load("textures/tiles/Portuguese_Floor_001_COLOR.jpg",
		function(texture) {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.offset.set(0, 0);
			texture.repeat.set(.07, .04);
		});
	const normalMap2 = textureLoader.load("textures/tiles/Portuguese_Floor_001_NORM.jpg",
		function(texture) {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.offset.set(0, 0);
			texture.repeat.set(.07, .04);
		});
	const aoMap2 = textureLoader.load("textures/tiles/Portuguese_Floor_001_OCC.jpg",
		function(texture) {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.offset.set(0, 0);
			texture.repeat.set(.07, .04);
		});

	var arcShape = new Shape();
	arcShape.moveTo(outerRadius * 2, outerRadius);
	arcShape.absarc(outerRadius, outerRadius, outerRadius, 0, Math.PI * 2, false);
	var holePath = new Path();
	holePath.moveTo(outerRadius + innerRadius, outerRadius);
	holePath.absarc(outerRadius, outerRadius, innerRadius, 0, Math.PI * 2, true);
	arcShape.holes.push(holePath);

	var geometry = new ExtrudeGeometry(arcShape, {
		depth: height,
		bevelEnabled: false,
		steps: 5,
		curveSegments: 60
	});
	geometry.center();
	geometry.rotateX(Math.PI * -.5);
	// var mesh = new Mesh(geometry, marbleMaterial);
	mainBase = new Mesh(geometry, [new MeshStandardMaterial({
		map: diffuseMap,
		normalMap: normalMap,
		aoMap: aoMap,
		aoMapIntensity: 1,
		// roughness: roughnessMap,
		roughness: 0.5,
		metalness: .1
	}), new MeshStandardMaterial({
		map: diffuseMap2,
		normalMap: normalMap2,
		aoMap: aoMap2,
		aoMapIntensity: 1,
		// roughness: roughnessMap,
		roughness: 0.5,
		metalness: .1
	})]);

	mainBase.position.z = -1295
 	mainBase.position.y = -50
	mainBase.rotation.y = Math.PI / 2


	scene.add(mainBase);


	return mainBase
}

export {
	createBaseCentre,
}
