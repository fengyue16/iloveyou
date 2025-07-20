import * as THREE from "https://cdn.skypack.dev/three@0.135.0";
import { gsap } from "https://cdn.skypack.dev/gsap@3.8.0";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/GLTFLoader";

class World {
    constructor({ canvas, cameraPosition, fieldOfView = 75, nearPlane = 0.1, farPlane = 100 }) {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x16000a);
        this.clock = new THREE.Clock();

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspectRatio = this.width / this.height;

        this.camera = new THREE.PerspectiveCamera(fieldOfView, this.aspectRatio, nearPlane, farPlane);
        this.camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        this.scene.add(this.camera);

        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(this.width, this.height);

        this.textureLoader = new THREE.TextureLoader();

        // Tích hợp mô hình trái tim
        this.addHeartModel();
        this.render();
        this.listenToResize();
        this.listenToMouseMove();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    loop() {
        const delta = this.clock.getDelta();
        // Quay trái tim nếu đã tải xong
        if (this.heartModel) this.heartModel.rotation.y -= delta * 0.5;
        this.render();
        requestAnimationFrame(this.loop.bind(this));
    }

    listenToResize() {
        window.addEventListener("resize", () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);
        });
    }

    listenToMouseMove() {
        window.addEventListener("mousemove", (e) => {
            const x = e.clientX;
            const y = e.clientY;
            gsap.to(this.camera.position, {
                x: gsap.utils.mapRange(0, window.innerWidth, 0.2, -0.2, x),
                y: gsap.utils.mapRange(0, window.innerHeight, 0.2, -0.2, -y)
            });
        });
    }

    addHeartModel() {
        const loader = new GLTFLoader();
        loader.load(
            "https://assets.codepen.io/74321/heart.glb",
            (gltf) => {
                
                this.heartModel = gltf.scene.children[0];
                this.heartModel.scale.set(1.5, 1.5, 1.5); // Điều chỉnh kích thước trái tim
                this.heartModel.material = new THREE.MeshMatcapMaterial({
                    matcap: this.textureLoader.load("https://assets.codepen.io/74321/3.png"),
                    color: "#ff89aC"
                });
                this.scene.add(this.heartModel);
            },
            undefined,
            (error) => {
                console.error("Failed to load heart model:", error);
            }
        );
    }
}

// Khởi tạo thế giới 3D với trái tim
const world = new World({
    canvas: document.querySelector("canvas.webgl"),
    cameraPosition: { x: 0, y: 0, z: 4.5 }
});
world.loop();