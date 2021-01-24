import {
	TextureLoader,
	RepeatWrapping,
	MeshStandardMaterial,
	Vector2,
	BoxBufferGeometry,
	Mesh,
	Group,
	MeshBasicMaterial,
	SphereBufferGeometry
} from '../../build/three.module.js';

function createGarden(scene,waterGardenSize,waterGardenPos,loadingManager) {

  const textureLoader = new TextureLoader(loadingManager);
  const diffuseMap = textureLoader.load("textures/marble/Marble_Carrara_002_COLOR.jpg",
    function(texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(2, 100);
    });
  const normalMap = textureLoader.load("textures/marble/Marble_Carrara_002_NORM.jpg",
    function(texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(2, 100);
    });
  const aoMap = textureLoader.load("textures/marble/Marble_Carrara_002_OCC.jpg",
    function(texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(2, 100);
    });
  const roughnessMap = textureLoader.load("textures/marble/Marble_Carrara_002_ROUGH.jpg",
    function(texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(2, 100);
    });
  /////////////////////////////
  const diffuseMapMoss = textureLoader.load("textures/grass2/Stylized_Grass_001_basecolor.jpg",
    function(texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(1, 50);
    });
  const normalMapMoss = textureLoader.load("textures/grass2/Stylized_Grass_001_normal.jpg",
    function(texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(1, 50);
    });
  const aoMapMoss = textureLoader.load("textures/grass2/Stylized_Grass_001_ambientOcclusion.jpg",
    function(texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(1, 50);
    });
  const displacementMapMoss = textureLoader.load("textures/grass2/Stylized_Grass_001_height.jpg",
    function(texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(1, 50);
    });
  const roughnessMapMoss = textureLoader.load("textures/grass2/Stylized_Grass_001_roughness.jpg",
    function(texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.offset.set(0, 0);
      texture.repeat.set(1, 50);
    });

  ///////////////////////////////////////////////////////////////////////////

  let marbleMaterial = new MeshStandardMaterial({
    map: diffuseMap,
    normalMap: normalMap,
    // envMap: cubeMap,

    // normalScale: 2,
    aoMap: aoMap,
    aoMapIntensity: 1,
    roughnessMap: roughnessMap,
    metalness: .5
  });

  let mossMaterial = new MeshStandardMaterial({
    map: diffuseMapMoss,
    normalMap: normalMapMoss,
    normalScale: new Vector2(5, 5),
    // envMap: cubeMap,
    aoMap: aoMapMoss,
    aoMapIntensity: 1,
    // roughnessMap: roughnessMapMoss,
    // metalness: .5
  });

  const adjuster = 500
  const gardenBoxGeometry = new BoxBufferGeometry(40, waterGardenSize - adjuster, 20);
  const mossBoxGeometry = new BoxBufferGeometry(30, waterGardenSize - adjuster, .1);


  const gardenBox = new Mesh(
    gardenBoxGeometry,
    marbleMaterial
  );

  const mossPlane = new Mesh(
    mossBoxGeometry,
    mossMaterial
  );

  mossPlane.receiveShadow = true

  gardenBox.rotation.x = Math.PI / 2;
  gardenBox.position.x = 180;
  gardenBox.position.y = -50;
  gardenBox.position.z = -waterGardenPos + adjuster / 2;

  mossPlane.rotation.x = gardenBox.rotation.x
  mossPlane.position.x = gardenBox.position.x
  mossPlane.position.y = gardenBox.position.y + 10
  mossPlane.position.z = gardenBox.position.z

  let gardenGroup = new Group();
  gardenGroup.add(gardenBox, mossPlane);

  let gardenGroup2 = gardenGroup.clone()
  gardenGroup2.position.x = -gardenBox.position.x * 2;

  scene.add(gardenGroup, gardenGroup2);
}

export {
	createGarden
}
