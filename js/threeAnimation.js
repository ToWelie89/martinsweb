import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'

let object, pmremGenerator, directionalLight, orbit, plane, camera, mixer, animations, controls, renderer;
const clock = new THREE.Clock();

const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
let windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);

const cameraConfigurations = {
    default: {
        rotation: {
            x: -0.20109952889104435,
            y: -0.007656962676424146,
            z: 0
        },
        position: {
            x: -0.32500515103057936,
            y: 7.95142682045288,
            z: 26.22902112349524
        }

    }
}

/* windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
mouse.x = (0 - windowHalf.x);
mouse.y = (0 - windowHalf.x); */

document.addEventListener('mousemove', ev => {
    windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
    mouse.x = (ev.clientX - windowHalf.x);
    mouse.y = (ev.clientY - windowHalf.x);
}, false);

// Debounce
function debounce(func, time){
    var time = time || 100; // 100 by default if no param
    var timer;
    return function(event){
        if(timer) clearTimeout(timer);
        timer = setTimeout(func, time, event);
    };
}
// Function with stuff to execute
function resizeContent() {
    // Do loads of stuff once window has resized
    const bbox = document.getElementById('sonesson3dlogo').getBoundingClientRect();
    renderer.setSize(bbox.width, bbox.height);
}
// Eventlistener
window.addEventListener("resize", debounce( resizeContent, 150 ));


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

function degrees_to_radians(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}

function setAllSubChildrenToReceiveShadow(children) {
    children.forEach(child => {
        child.receiveShadow = true;
        child.castShadow = true;
        child.near = 0.001;
        child.far = 3000;
        if (child.material) {
            child.material.receiveShadow = true;
        }

        if (child.children && child.children.length > 0) {
            setAllSubChildrenToReceiveShadow(child.children);
        }
    });
}

window.start3dAnimation = () => {
    const bbox = document.getElementById('sonesson3dlogo').getBoundingClientRect();
    const scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const neutralEnvironment = pmremGenerator.fromScene(new RoomEnvironment()).texture;
    //scene.environment = neutralEnvironment;
    renderer.setSize(bbox.width, bbox.height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    //renderer.setClearColor(0x000000);

    //renderer.setClearAlpha(0);
    document.getElementById('sonesson3dlogo').appendChild(renderer.domElement);

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

    const geometry = new THREE.BoxGeometry(1000, 1000, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ffff });
    //const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
    material.receiveShadow = true;
    material.castShadow = true;
    const cube = new THREE.Mesh(geometry, material);
    cube.receiveShadow = true;

    cube.position.z = -5;
    //scene.add(cube);

    const MANAGER = new THREE.LoadingManager();
    const THREE_PATH = `https://unpkg.com/three@0.${THREE.REVISION}.x`
    const DRACO_LOADER = new DRACOLoader(MANAGER).setDecoderPath(`${THREE_PATH}/examples/js/libs/draco/gltf/`);
    const KTX2_LOADER = new KTX2Loader(MANAGER).setTranscoderPath(`${THREE_PATH}/examples/js/libs/basis/`);

    const assetLoader = new GLTFLoader(MANAGER)
        .setDRACOLoader(DRACO_LOADER)
        .setKTX2Loader(KTX2_LOADER.detectSupport(renderer))
        .setMeshoptDecoder(MeshoptDecoder);

    assetLoader.load('./assets/sonesson_logo.glb', function (gltf) {
        console.log('gltf', gltf);

        object = gltf.scene || gltf.scenes[0];

        gltf.scene.traverse(function (object) {
            object.frustumCulled = false;
        });

        mixer = new THREE.AnimationMixer(scene);
        mixer.addEventListener('finished', function (e) {
            console.log('FINISHED');
        });
        animations = gltf.animations;

        camera = gltf.cameras[0];
        camera.near = 0.001;
        camera.far = 3000;
        window.camera = camera;
        /* orbit = new OrbitControls(camera, renderer.domElement);
        orbit.update(); */

        camera.position.x = cameraConfigurations.default.position.x;
        camera.position.y = cameraConfigurations.default.position.y;
        camera.position.z = cameraConfigurations.default.position.z;
        camera.rotation.x = cameraConfigurations.default.rotation.x;
        camera.rotation.y = cameraConfigurations.default.rotation.y;
        camera.rotation.z = cameraConfigurations.default.rotation.z;

        controls = new PointerLockControls(camera, renderer.domElement);

        setAllSubChildrenToReceiveShadow(gltf.scene.children);

        gltf.scene.children.find(x => x.name === 'Backdrop').receiveShadow = false;

        gltf.scene.children.filter(x => x.name.includes('Cloud')).forEach(child => {
            const mat = new THREE.MeshStandardMaterial({ color: 0xffffff });;
            mat.receiveShadow = true;
            mat.castShadow = true;
            child.material = mat;
        });

        object.receiveShadow = true;
        object.castShadow = true;
        window.object = object;
        scene.add(object);

        camera.loopIndex = 0;

        updateTextureEncoding(object);

        const cloudAnimation = animations.find(x => x.name === 'CLOUDACTION');
        if (cloudAnimation) {
            const clip = mixer.clipAction(cloudAnimation);
            clip.reset().play();
        }
        const carAnimation = animations.find(x => x.name === 'CarAction');
        if (carAnimation) {
            const clip = mixer.clipAction(carAnimation);
            clip.reset().play();
        }
        const birdAnimation = animations.find(x => x.name === 'Action.001');
        if (birdAnimation) {
            const clip = mixer.clipAction(birdAnimation);
            clip.reset().play();
        }
        const birdAnimation2 = animations.find(x => x.name === 'CenterAction');
        if (birdAnimation2) {
            const clip = mixer.clipAction(birdAnimation2);
            clip.reset().play();
        }
        const guyAnimation = animations.find(x => x.name === 'Guy');
        if (guyAnimation) {
            const clip = mixer.clipAction(guyAnimation);
            clip.reset().play();
        }
        const propellerAnimation = animations.find(x => x.name === 'Propeller');
        if (propellerAnimation) {
            const clip = mixer.clipAction(propellerAnimation);
            clip.reset().play();
        }
        const pilotAnimation = animations.find(x => x.name === 'Pilot');
        if (pilotAnimation) {
            const clip = mixer.clipAction(pilotAnimation);
            clip.reset().play();
        }
        animations.filter(x => x.name.includes('PlanePath')).forEach((animation, i) => {
            const clip = mixer.clipAction(animation);
            clip.reset().play();
        });
        animations.filter(x => x.name.includes('TreeAction')).forEach((animation, i) => {
            setTimeout(() => {
                const clip = mixer.clipAction(animation);
                clip.reset().play();
            }, i * 75);
        });
        animations.filter(x => x.name.includes('Flag')).forEach(animation => {
            const clip = mixer.clipAction(animation);
            clip.reset().play();
        });
        animations.filter(x => x.name.includes('Text') && x.name.includes('Action')).forEach(animation => {
            const clip = mixer.clipAction(animation);

            clip.setLoop(THREE.LoopOnce);
            clip.clampWhenFinished = true;

            clip.reset().play();
        });
    }, undefined, function (error) {
        console.error(error);
    });

    function animate() {
        target.x = (1 - mouse.x) * 0.0002;
        target.y = (1 - mouse.y) * 0.0002;
        target.y -= 0.3

        if (camera) {
            camera.rotation.x += 0.05 * (target.y - camera.rotation.x);
            camera.rotation.y += 0.05 * (target.x - camera.rotation.y);
        }

        requestAnimationFrame(animate);
        if (mixer) mixer.update(clock.getDelta());

        if (camera && scene) {
            renderer.render(scene, camera);
        }
    };

    animate();
}
