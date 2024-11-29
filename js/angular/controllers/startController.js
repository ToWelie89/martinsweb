/**
 * @constructor StartController
 * @memberof controllers
 * @description Controller for main page
 * @param {$scope} $scope - See {@link https://code.angularjs.org/1.2.26/docs/api/ng/type/$rootScope.Scope}
 */

import * as THREE from 'three';
export default class StartController {

    /**
     * @function controllers.StartController#constructor
     * @description Initilization function
     */
    constructor($scope) {

        window.start3dAnimation();

        //this.demo();

        //this.createRenderer();
        //this.createScene();

        // TRIGGER SVG ANIMATION
        /* $('.signature svg').each(function() {
            var delay, i, len, length, path, paths, previousStrokeLength, results, speed;
            paths = $('path, circle, rect', this);
            delay = 0;
            results = [];
            for (i = 0, len = paths.length; i < len; i++) {
                path = paths[i];
                length = path.getTotalLength();
                previousStrokeLength = speed || 0;
                speed = length < 40 ? 20 : Math.floor(length);

                speed = Math.floor(speed * 0.6);
                
                delay += previousStrokeLength + 40;
                results.push(
                    $(path)
                        .css('transition', 'none')
                        .attr('data-length', length)
                        .attr('data-speed', speed)
                        .attr('data-delay', delay)
                        .attr('stroke-dashoffset', length)
                        .attr('stroke-dasharray', length + ',' + length)
                );
            }
        });
        $('.signature svg').each(function() {
            var delay, i, len, length, path, paths, results, speed;
            paths = $('path, circle, rect', this);
            results = [];
            for (i = 0, len = paths.length; i < len; i++) {
                path = paths[i];
                length = $(path).attr('data-length');
                speed = $(path).attr('data-speed');
                delay = $(path).attr('data-delay');
                results.push($(path).css('transition', 'stroke-dashoffset ' + speed + 'ms ' + delay + 'ms linear').attr('stroke-dashoffset', '0'));
            }
        }); */
    }

    demo() {
        const bbox = document.getElementById('sonesson3dlogo').getBoundingClientRect()

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, bbox.width / bbox.height, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(bbox.width, bbox.height);
        document.getElementById('sonesson3dlogo').appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);

            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            renderer.render(scene, camera);
        };

        animate();
    }

    createScene() {
        this.scene = new THREE.Scene();

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        this.scene.add(cube);

        this.camera = new THREE.PerspectiveCamera(75, document.getElementById('sonesson3dlogo').innerWidth / document.getElementById('sonesson3dlogo').innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setClearColor(0xcccccc);
        this.renderer.setPixelRatio(document.getElementById('sonesson3dlogo').devicePixelRatio);

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        //renderer.toneMapping = THREE.ACESFilmicToneMapping;
        //renderer.toneMappingExposure = 1;

        this.renderer.setClearColor(0x0c0c0c);
        this.renderer.setSize(document.getElementById('sonesson3dlogo').innerWidth, document.getElementById('sonesson3dlogo').innerHeight);
        document.getElementById('sonesson3dlogo').appendChild(this.renderer.domElement);
    };
}