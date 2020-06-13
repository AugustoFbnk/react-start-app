import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import React, { Component } from 'react';

class GLTFComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            clientWidth: props.clientWidth,
            clientHeight: props.clientHeight
        }
    }
    componentDidMount() {
        this.main();
    }
    createCamera() {
        const fov = 45;
        const aspect = 2;
        const near = 0.1;
        const far = 100;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 10, 20);
        camera.position.set(0, 10, 20);
        return camera;
    }
    createScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('black');
        {
            const skyColor = 0xB1E1FF;
            const groundColor = 0xB97A20;
            const intensity = 1;
            const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
            scene.add(light);
        }
        {
            const color = 0xFFFFFF;
            const intensity = 1;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(5, 10, 2);
            scene.add(light);
            scene.add(light.target);
        }
        return scene;
    }
    createControls(camera, canvas) {
        const controls = new OrbitControls(camera, canvas);
        controls.target.set(0, 5, 0);
        controls.update();
        return controls;
    }
    main() {
        const canvas = document.getElementById(this.state.url);
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(this.state.clientWidth, this.state.clientHeight, false);
        const camera = this.createCamera();
        const controls = this.createControls(camera, canvas);
        const scene = this.createScene();
        {
            const gltfLoader = new GLTFLoader();
            gltfLoader.load(this.state.url, (gltf) => {
                const root = gltf.scene;
                scene.add(root);
                const box = new THREE.Box3().setFromObject(root);
                const boxSize = box.getSize(new THREE.Vector3()).length();
                const boxCenter = box.getCenter(new THREE.Vector3());
                controls.maxDistance = boxSize * 10;
                controls.target.copy(boxCenter);
                controls.update();
            },
                function (xhr) {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                function (error) {
                    console.log('An error happened');
                });
        }

        function render() {
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    render() {
        return (
            <div className="GLTFClass">
                <canvas id={this.state.url}></canvas>
            </div>
        );
    }
}

export default GLTFComponent;