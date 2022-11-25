import * as THREE from "three";
import { gsap } from "gsap/all";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import App from "./app.js";

export default class Camera {
  constructor() {
    this.app = new App();
    this.initialized = false;

    this.setInstance();
    this.setOrbitControls();

    this.views = {
      initial: {
        x: 65,
        y: 2,
        z: 40,
        tX: 3,
        tY: 4,
        tZ: 6,
        duration: 3,
        ease: "back.out(1)",
        hash: "#initial",
      },

      main: {
        x: 65,
        y: 2,
        z: 40,
        tX: 3,
        tY: 4,
        tZ: 6,
        duration: 1,
        ease: "power3.inOut",
        hash: "#mainmenu",
      },

      UpperGallery: {
        x: 30,
        y: 6.5,
        z: 8,
        tX: -1,
        tY: 6.5,
        tZ: 1,
        duration: 1,
        ease: "power3.inOut",
        hash: "#lab",
      },

      LowerGallery: {
        x: 32,
        y: 1,
        z: 0,
        tX: 1,
        tY: 3,
        tZ: -5,
        duration: 1,
        ease: "power3.inOut",
        hash: "#work",
      },

      HightGallery: {
        x: 34,
        y: 10,
        z: 10,
        tX: 1,
        tY: 10,
        tZ: 10,
        duration: 1,
        ease: "power3.inOut",
        hash: "#done",
      },

      Deck: {
        x: 0.3,
        y: 1.35,
        z: 42,
        tX: 0.3,
        tY: 0.2,
        tZ: 0,
        duration: 1,
        ease: "power3.inOut",
        hash: "#about",
      },

      Saichania: {
        x: 10,
        y: 3.25, // 2
        z: 1, // 0
        tX: 6,
        tY: 2.75, // 2
        tZ: 1, // 0
        duration: 1,
        ease: "power3.inOut",
        hash: "#googleassistant",
      },

      Spinosaurus: {
        x: 8, //
        y: 3.25, // góc cam trên
        z: -1.5, // trái phải
        tX: 4,
        tY: 2.75, // góc cam dưới
        tZ: -1.5, // trái phải
        duration: 1,
        ease: "power3.inOut",
        hash: "#googleio",
      },

      Parasaurolophus: {
        x: 10,
        y: 3.25, // 1
        z: -3.7, // -2.5
        tX: 6,
        tY: 2.75, // 1
        tZ: -3.7, // -2.5
        duration: 1,
        ease: "power3.inOut",
        hash: "#pizzahut",
      },

      Velociraptor: {
        x: 8,
        y: 3.25, // 1
        z: -6, // -5
        tX: 4,
        tY: 2.75, // 1
        tZ: -6, // -5
        duration: 1,
        ease: "power3.inOut",
        hash: "#usopen",
      },
      Giganotosaurus: {
        x: 10,
        y: 3.25, // 1
        z: -8.1, // -5
        tX: 6,
        tY: 2.75, // 1
        tZ: -8.1, // -5
        duration: 1,
        ease: "power3.inOut",
        hash: "#usopenqq",
      },
      Therizinosaurus: {
        x: 8,
        y: 3.25, // 1
        z: -10.4, // -5
        tX: 4,
        tY: 2.75, // 1
        tZ: -10.4, // -5
        duration: 1,
        ease: "power3.inOut",
        hash: "#usopen",
      },
      ///////////////////
      Kronosaurus: {
        x: 10,
        y: 7.75, // 2
        z: 8.2, // 0
        tX: 6,
        tY: 7.25, // 2
        tZ: 8.2, // 0
        duration: 1,
        ease: "power3.inOut",
        hash: "#googleassistant",
      },

      Mosasaurus: {
        x: 8,
        y: 7.5, // 1
        z: 6, // -2.5
        tX: 4,
        tY: 7, // 1
        tZ: 6, // -2.5
        duration: 1,
        ease: "power3.inOut",
        hash: "#beagle",
      },
      Baryonyx: {
        x: 10,
        y: 7.75, // 1
        z: 3.5, // -2.5
        tX: 6,
        tY: 7.25, // 1
        tZ: 3.5, // -2.5
        duration: 1,
        ease: "power3.inOut",
        hash: "#animation",
      },

      Pterodactyl: {
        x: 8,
        y: 7.5, // 5.95
        z: 1, // 13
        tX: 4,
        tY: 7, // 5.95
        tZ: 1, // 13
        duration: 1,
        ease: "power3.inOut",
        hash: "#vr",
      },

      Triceratops: {
        x: 10,
        y: 7.75, // 1
        z: -1.3, // -2.5
        tX: 6,
        tY: 7.25, // 1
        tZ: -1.3, // -3.5
        duration: 1,
        ease: "power3.inOut",
        hash: "#interactive",
      },

      Tyrannosaurusrex: {
        x: 8,
        y: 7.5, // 5.95
        z: -3.5, // 13
        tX: 4,
        tY: 7, // 5.95
        tZ: -3.5, // 13
        duration: 1,
        ease: "power3.inOut",
        hash: "#proto",
      },
      Coelophysis: {
        x: 10,
        y: 12.25, // 5.95
        z: 16.35, // 3
        tX: 6,
        tY: 11.75, // 5.95
        tZ: 16.35, // 3
        duration: 1,
        ease: "power3.inOut",
        hash: "#vintage",
      },
      /////
      Pistosaur: {
        x: 8,
        y: 12, // 5.95
        z: 14.2, // 3
        tX: 4,
        tY: 11.5, // 5.95
        tZ: 14.2, // 3
        duration: 1,
        ease: "power3.inOut",
        hash: "#vintage",
      },

      Allosaurus: {
        x: 10,
        y: 12, // 5.95
        z: 12.2, // 3
        tX: 6,
        tY: 11.5, // 5.95
        tZ: 12.2, // 3
        duration: 1,
        ease: "power3.inOut",
        hash: "#vintage",
      },

      Brachiosaurus: {
        x: 8,
        y: 12, // 5.95
        z: 9.6, // 3
        tX: 4,
        tY: 11.5, // 5.95
        tZ: 9.6, // 3
        duration: 1,
        ease: "power3.inOut",
        hash: "#vintage",
      },

      Dimorphodon: {
        x: 10,
        y: 12, // 5.95
        z: 7.4, // 3
        tX: 6,
        tY: 11.5, // 5.95
        tZ: 7.4, // 3
        duration: 1,
        ease: "power3.inOut",
        hash: "#vintage",
      },
      Dryosauro: {
        x: 8,
        y: 12, // 5.95
        z: 5.2, // 3
        tX: 4,
        tY: 11.5, // 5.95
        tZ: 5.2, // 3
        duration: 1,
        ease: "power3.inOut",
        hash: "#vintage",
      },
    }; // views lib
  }

  setInstance() {
    let ratio = this.app.sizes.width / this.app.sizes.height;

    this.instance = new THREE.PerspectiveCamera(
      35 - ratio * 10, // targets 15deg for 16:9 screen and 35deg for 9:16
      ratio,
      3,
      120
    );

    this.instance.position.set(65, 20, 40);

    this.app.scene.add(this.instance);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.app.canvas);
    this.controls.target.set(3, 34, 6);
    this.controls.enableDamping = true;
    this.controls.enabled = false;
    // this.controls.enableZoom = false;
    // this.controls.enablePan = false;
    // this.controls.minAzimuthAngle = 0.65;
    // this.controls.maxAzimuthAngle = 2.5;
    // this.controls.minPolarAngle = 1.4;
    // this.controls.maxPolarAngle = 1.64;
  }

  resize() {
    let ratio = this.app.sizes.width / this.app.sizes.height;
    this.instance.aspect = ratio;
    this.instance.fov = 35 - ratio * 10;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }

  moveTo(view) {
    window.location = this.views[view].hash;

    gsap.killTweensOf(this.instance.position);
    gsap.killTweensOf(this.controls.target);

    gsap.to(this.instance.position, {
      x: this.views[view].x,
      y: this.views[view].y,
      z: this.views[view].z,
      duration: this.views[view].duration,
      ease: this.views[view].ease,
      onComplete: toggleMoreOpacity.bind(this),
    });

    gsap.to(this.controls.target, {
      x: this.views[view].tX,
      y: this.views[view].tY,
      z: this.views[view].tZ,
      duration: this.views[view].duration,
      ease: this.views[view].ease,
      onComplete: () => {
        this.app.displayMeshes.addModels();
      },
    });

    function toggleMoreOpacity() {
      let moreProjectsText = this.app.scene.getObjectByName("TextMoreProjects");
      if (view === "LowerGallery") {
        gsap.to(moreProjectsText.material, { opacity: 1, duration: 0.5 });
      } else if (moreProjectsText.material.opacity > 0) {
        gsap.to(moreProjectsText.material, { opacity: 0, duration: 0.5 });
      }
    }
  }
}
