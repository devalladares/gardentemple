import {
	SphereGeometry,
	PointsMaterial,
	Vector3,
	Points,
	Object3D
} from '../../build/three.module.js';

function createStars(scene, starGroup) {

	const starQty = 24000/4;
	const geometry = new SphereGeometry(100, 1, 1);

	const materialOptions = {
		size: 1.0,
		fog: false,
		color: 'white'
	};

	const starStuff = new PointsMaterial(materialOptions);

	for (let i = 0; i < starQty; i++) {

		const x = 3000
		const y = 2000
		const z = 3000

		let starVertex = new Vector3();

		starVertex.x = Math.random() * x - x / 2;
		starVertex.y = Math.random() * 1000 - 100
		starVertex.z = Math.random() * z - z / 2;

		geometry.vertices.push(starVertex);

	}
	const stars = new Points(geometry, starStuff);

	starGroup = new Object3D();
	starGroup.add(stars)
	scene.add(starGroup);

	return starGroup;
}

export {
	createStars
};
