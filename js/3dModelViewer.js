import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let x = null;
let y = null;
let mouseInsideCanvas = false;
let object, pmremGenerator, directionalLight, textObject, orbit, plane, camera, mixer, animations;
const clock = new THREE.Clock();

const traverseMaterials = (object, callback) => {
    object.traverse((node) => {
        if (!node.isMesh) return;
        node.near = 0.01;
        const materials = Array.isArray(node.material)
            ? node.material
            : [node.material];
        materials.forEach(callback);
    });
}

const updateTextureEncoding = (object) => {
    const encoding = THREE.sRGBEncoding;
    traverseMaterials(object, (material) => {
        if (material.map) material.map.encoding = encoding;
        if (material.emissiveMap) material.emissiveMap.encoding = encoding;
        if (material.map || material.emissiveMap) material.needsUpdate = true;
    });
}

window.initiate3dModel = (gltfSource, containerName, enableOrbit = true, cameraConfig = null, childrenCallback = null, loopingAnimationsFilter = undefined, playOnceAnimationsFilter = undefined, orbitSettings = false, clearColor = 0x000000) => {
    console.log('initiate3dModel', gltfSource, containerName)
    const bbox = document.getElementById(containerName).getBoundingClientRect();
    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    //const neutralEnvironment = pmremGenerator.fromScene(new RoomEnvironment()).texture;
    //scene.environment = neutralEnvironment;
    renderer.setSize(bbox.width, bbox.height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setClearColor(clearColor);
    //renderer.setClearAlpha(0);
    document.getElementById(containerName).appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.3);
    spotLight.position.set(0, 30, 30);

    /* spotLight.castShadow = true;
    spotLight.position.set(0, 100, 20)
    spotLight.shadow.mapSize.width = 512;
    spotLight.shadow.mapSize.height = 512;
    spotLight.shadow.radius = 20;
    spotLight.shadow.bias = -0.0005;
    spotLight.shadow.camera.left = -20;
    spotLight.shadow.camera.right = 20;
    spotLight.shadow.camera.top = 15;
    spotLight.shadow.camera.bottom = -15;
    spotLight.travelRight = true; */

    scene.add(spotLight);
    /* const spotLightHelper = new THREE.SpotLightHelper(spotLight, 1);
    scene.add(spotLightHelper); */


    directionalLight = new THREE.DirectionalLight(0xffffff, 1.4);
    directionalLight.castShadow = true;
    directionalLight.position.set(0, 100, 20)
    directionalLight.shadow.mapSize.width = 512;
    directionalLight.shadow.mapSize.height = 512;
    directionalLight.shadow.radius = 20;
    directionalLight.shadow.bias = -0.0005;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 15;
    directionalLight.shadow.camera.bottom = -15;
    directionalLight.travelRight = true;
    scene.add(directionalLight);
    window.directionalLight = directionalLight;
    /* const helper2 = new THREE.DirectionalLightHelper(directionalLight, 5);
    scene.add(helper2);
    const helper = new THREE.CameraHelper(directionalLight.shadow.camera)
    scene.add(helper); */

    /* const hemiLight = new THREE.HemisphereLight(0xffffff, 0x9420ab, 0.2);
    scene.add(hemiLight); */

    const MANAGER = new THREE.LoadingManager();
    const THREE_PATH = `https://unpkg.com/three@0.${THREE.REVISION}.x`
    const DRACO_LOADER = new DRACOLoader(MANAGER).setDecoderPath(`${THREE_PATH}/examples/js/libs/draco/gltf/`);
    const KTX2_LOADER = new KTX2Loader(MANAGER).setTranscoderPath(`${THREE_PATH}/examples/js/libs/basis/`);

    const assetLoader = new GLTFLoader(MANAGER)
        .setDRACOLoader(DRACO_LOADER)
        .setKTX2Loader(KTX2_LOADER.detectSupport(renderer))
        .setMeshoptDecoder(MeshoptDecoder);

    assetLoader.load(gltfSource, function (gltf) {
        console.log('gltf', gltf);

        object = gltf.scene || gltf.scenes[0];

        object.receiveShadow = true;
        object.castShadow = true;

        gltf.scene.traverse(function (object) {
            object.frustumCulled = false;
        });

        mixer = new THREE.AnimationMixer(scene);
        animations = gltf.animations;

        if (gltf.cameras && gltf.cameras.length > 0) {
            camera = gltf.cameras[0];
            camera.near = 0.001;
            camera.far = 3000;
        } else {
            camera = new THREE.PerspectiveCamera(
                60,
                bbox.width / bbox.height,
                0.001,
                1000
            );
        }

        window.camera = camera;

        if (enableOrbit) {
            orbit = new OrbitControls(camera, renderer.domElement);

            if (orbitSettings) {
                Object.keys(orbitSettings).forEach(key => {
                    orbit[key] = orbitSettings[key];    
                });
            }

            window.orbit = orbit;

            orbit.update();
        }

        if (cameraConfig) {
            camera.position.x = cameraConfig.position.x;
            camera.position.y = cameraConfig.position.y;
            camera.position.z = cameraConfig.position.z;
    
            camera.rotation.x = cameraConfig.rotation.x;
            camera.rotation.y = cameraConfig.rotation.y;
            camera.rotation.z = cameraConfig.rotation.z;
        }

        if (childrenCallback) {
            childrenCallback(gltf.scene.children);
        }

        gltf.scene.children.filter(x => x.name.includes('Cloud')).forEach(child => {
            const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });;
            mat.receiveShadow = true;
            mat.castShadow = true;
            child.material = mat;
        });

        const box = new THREE.Box3().setFromObject(object);
        const center = box.getCenter(new THREE.Vector3());
        object.position.x += (object.position.x - center.x);
        object.position.y += (object.position.y - center.y);
        object.position.z += (object.position.z - center.z);
        window.object = object;
        scene.add(object);

        updateTextureEncoding(object);

        if (loopingAnimationsFilter) {
            loopingAnimationsFilter(animations).forEach(animation => {
                const clip = mixer.clipAction(animation);
                clip.reset().play();
            })
        }
        if (playOnceAnimationsFilter) {
            playOnceAnimationsFilter(animations).forEach(animation => {
                const clip = mixer.clipAction(animation);
                clip.setLoop(THREE.LoopOnce);
                clip.clampWhenFinished = true;
                clip.reset().play();
            })
        }
    }, undefined, function (error) {
        console.error(error);
    });

    function animate() {
        requestAnimationFrame(animate);
        if (mixer) mixer.update(clock.getDelta());
        if (camera && scene) {
            renderer.render(scene, camera);
        }
    };

    animate();
}
