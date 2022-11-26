import * as THREE from "three";
import { gsap } from "gsap/all";
import App from "./app.js";
import featuredProjects from "../featured.json";
import labProjects from "../lab.json";
import doneProjects from "../done.json";

export default class Navigation {
  constructor() {
    this.app = new App();

    this.raycaster = new THREE.Raycaster();
    this.intersections = [];
    this.pointer = new THREE.Vector2(-11, -1);

    let UpperGallery = document.getElementById("menulab");
    let LowerGallery = document.getElementById("menuwork");
    let HightGallery = document.getElementById("menudone");
    let Deck = document.getElementById("menuabout");
    this.mainMenu = { UpperGallery, LowerGallery, Deck, HightGallery };
    this.labMenu = this.createNavTags(labProjects);
    this.doneMenu = this.createNavTags(doneProjects);
    this.projectMenu = this.createNavTags(featuredProjects);
    this.aboutInfo = document.querySelector(".info");
    this.aboutStudio = document.querySelector(".studio");

    UpperGallery.addEventListener("pointermove", (event) => {
      event.stopPropagation();
    });
    LowerGallery.addEventListener("pointermove", (event) => {
      event.stopPropagation();
    });
    HightGallery.addEventListener("pointermove", (event) => {
      event.stopPropagation();
    });
    Deck.addEventListener("pointermove", (event) => {
      event.stopPropagation();
    });

    window.addEventListener("pointermove", this.checkIntersections.bind(this));
    window.addEventListener("pointerup", this.onPointerUp.bind(this));

    window.addEventListener("hashchange", (event) => {
      switch (window.location.hash) {
        case "#initial":
          break;

        case "#mainmenu":
          this.app.camera.moveTo("main");
          let back = document.querySelectorAll(".backbutton");
          back.forEach((each) => {
            each.remove();
          });
          this.clearWindows();
          break;

        case "#lab":
          this.app.camera.moveTo("UpperGallery");
          this.clearWindows();
          this.createBackButton();
          break;

        case "#work":
          this.app.camera.moveTo("LowerGallery");
          this.clearWindows();
          this.createBackButton();
          break;

        case "#done":
          this.app.camera.moveTo("HightGallery");
          this.clearWindows();
          this.createBackButton();
          break;

        case "#about":
          this.app.camera.moveTo("Deck");
          this.clearWindows();
          this.createBackButton();
          break;

        // case "#vr": // don't bother with the rest...
        //     this.app.camera.moveTo("Headset");
        //     labProjects.forEach( (project) => {
        //         if (project.model === "Headset") {
        //             this.createProjectWindow(project);
        //             this.labMenu.forEach( (navTag) => {navTag.classList.add("inactive"); } );
        //         }
        //     });
        //     this.projectMenu.forEach( (navTag) => {navTag.classList.add("inactive"); } );
        //     break;
      }
    });
  }

  checkIntersections(moveEvent) {
    this.pointer.x = (moveEvent.clientX / this.app.sizes.width) * 2 - 1;
    this.pointer.y = -(moveEvent.clientY / this.app.sizes.height) * 2 + 1;

    this.intersections.length = 0;

    this.raycaster.setFromCamera(this.pointer, this.app.camera.instance);
    this.raycaster.intersectObjects(
      this.app.scene.children,
      true,
      this.intersections
    );

    if (this.intersections.length === 0) {
      this.app.canvas.style.cursor = "default";
      Object.keys(this.mainMenu).forEach((key) => {
        this.mainMenu[key].classList.add("inactive");
        this.app.canvas.style.cursor = "default";
      });
    } else if (this.intersections.length > 0) {
      this.processIntersections(moveEvent);
    }
  }

  processIntersections(moveEvent) {
    let intersectedName = "";
    let selection = false;

    if (this.intersections.length > 0) {
      if (this.intersections[0].object.name === "GalleryPedestals") {
        intersectedName = this.intersections[1].object.name;
      } else {
        intersectedName = this.intersections[0].object.name;
      }
    }

    switch (window.location.hash) {
      case "#initial":
      // continue to main menu case

      case "#mainmenu":
        Object.keys(this.mainMenu).forEach((key) => {
          if (key === intersectedName) {
            this.mainMenu[key].classList.remove("inactive");
            this.app.canvas.style.cursor = "pointer";
            selection = true;
          } else {
            this.mainMenu[key].classList.add("inactive");
          }
        });

        break;

      case "#about":
        if (
          intersectedName === "Photo" ||
          intersectedName === "Swatches" ||
          intersectedName === "TextInfo" ||
          intersectedName === "TextStudio"
        ) {
          this.app.canvas.style.cursor = "pointer";
          selection = true;
        }
        break;

      case "#lab":
        this.labMenu.forEach((navTag) => {
          if (intersectedName === navTag.id) {
            navTag.style.left = `${moveEvent.clientX}px`;
            navTag.classList.remove("inactive");
            this.app.canvas.style.cursor = "pointer";
            selection = true;
          } else {
            navTag.classList.add("inactive");
          }
        });
        break;

      case "#done":
        this.doneMenu.forEach((navTag) => {
          if (intersectedName === navTag.id) {
            navTag.style.left = `${moveEvent.clientX}px`;
            navTag.classList.remove("inactive");
            this.app.canvas.style.cursor = "pointer";
            selection = true;
          } else {
            navTag.classList.add("inactive");
          }
        });
        break;

      case "#work":
        this.projectMenu.forEach((navTag) => {
          if (intersectedName === navTag.id) {
            navTag.style.left = `${moveEvent.clientX}px`;
            navTag.classList.remove("inactive");
            this.app.canvas.style.cursor = "pointer";
            selection = true;
          } else {
            navTag.classList.add("inactive");
          }
        });
        break;

      default:
      // console.log(window.location.hash)
    }

    if (!selection) {
      this.app.canvas.style.cursor = "default";
    }
  }

  onPointerUp(upEvent) {
    let location = "main";
    if (this.intersections.length > 0) {
      location = this.intersections[0].object.name;
    } else {
      this.app.camera.moveTo(location);
      return;
    }

    switch (window.location.hash) {
      case "#initial":
      // continue to main menu case

      case "#mainmenu":
        if (
          location === "UpperGallery" ||
          location === "LowerGallery" ||
          location === "HightGallery" ||
          location === "Deck"
        ) {
          this.app.camera.moveTo(location);
          this.createBackButton();
        }
        break;

      case "#work":
        if (location === "FloorPlane") {
          this.app.camera.moveTo("main");
          return;
        }

        featuredProjects.forEach((project) => {
          if (project.model === location) {
            this.createProjectWindow(project);
            this.projectMenu.forEach((navTag) => {
              navTag.classList.add("inactive");
            });
          }
        });
        break;

      case "#lab":
        if (location === "FloorPlane") {
          this.app.camera.moveTo("main");
          return;
        }
        labProjects.forEach((project) => {
          if (project.model === location) {
            this.createProjectWindow(project);
            this.labMenu.forEach((navTag) => {
              navTag.classList.add("inactive");
            });
          }
        });
        break;

      case "#done":
        if (location === "FloorPlane") {
          this.app.camera.moveTo("main");
          return;
        }
        doneProjects.forEach((project) => {
          if (project.model === location) {
            this.createProjectWindow(project);
            this.doneMenu.forEach((navTag) => {
              navTag.classList.add("inactive");
            });
          }
        });
        break;

      case "#about":
        if (location === "FloorPlane") {
          this.app.camera.moveTo("main");
          return;
        }
        if (
          location === "Photo" ||
          location === "Swatches" ||
          location === "TextInfo" ||
          location === "TextStudio"
        ) {
          this.openAboutWindow(location);
        }
        break;
    }

    Object.keys(this.mainMenu).forEach((key) => {
      this.mainMenu[key].classList.add("inactive");
    });
  }

  openAboutWindow(clicked) {
    let panel, closeButton;
    let canvas = this.app.canvas;

    if (clicked === "Photo" || clicked === "TextInfo") {
      panel = this.aboutInfo;
      closeButton = document.getElementById("infoclose");
    }
    if (clicked === "Swatches" || clicked === "TextStudio") {
      panel = this.aboutStudio;
      closeButton = document.getElementById("studioclose");
    }

    panel.classList.remove("inactive");
    panel.addEventListener("pointerup", (event) => {
      event.stopPropagation();
    });
    closeButton.addEventListener("pointerup", closePanel);
    canvas.addEventListener("pointerup", closePanel);

    function closePanel(event) {
      event.stopPropagation();
      panel.classList.add("inactive");
      closeButton.removeEventListener("pointerup", closePanel);
      canvas.removeEventListener("pointerup", closePanel);
    }
  }

  createBackButton() {
    let backCleanup = document.querySelectorAll(".backbutton");
    backCleanup.forEach((each) => {
      each.remove();
    });

    let backButton = document.createElement("div");
    backButton.classList.add("backbutton");
    backButton.innerHTML = `<span class="arrow"><</span> Back to Full View`;
    document.body.append(backButton);

    backButton.addEventListener("pointerup", (event) => {
      this.app.camera.moveTo("main");
      backButton.remove();
    });
  }

  createNavTags(projects) {
    const navTags = [];

    projects.forEach((project) => {
      let navTag = document.createElement("div");
      navTag.classList.add("projectmenu");
      navTag.classList.add("inactive");
      navTag.id = project.model;

      let navLabel = document.createElement("div");
      navLabel.classList.add("label");
      navLabel.innerText = project.title;
      navTag.append(navLabel);

      navTags.push(navTag);
      document.body.append(navTag);
    });

    return navTags;
  }

  createProjectWindow(project) {
    let backCleanup = document.querySelectorAll(".backbutton");
    backCleanup.forEach((each) => {
      each.remove();
    });

    let modelRef;
    this.app.scene.children.forEach((each) => {
      if (each.name === project.model) modelRef = each;
    });

    this.app.camera.moveTo(project.model);
    gsap.to(modelRef.rotation, {
      y: Math.PI * project.rotationMultiplier,
      duration: 22.0,
      ease: "power2.inOut",
    });

    let projectInfoWindow = document.createElement("div");
    let projectInfoInnerContainer = document.createElement("div");
    let projectTitle = document.createElement("div");
    let projectSub = document.createElement("div");
    let projectCategory = document.createElement("div");
    let projectDescription = document.createElement("div");
    let projectAwards = document.createElement("div");
    let projectMedia = document.createElement("div");
    let projectNav = document.createElement("div");
    let backButton = document.createElement("span");
    let nextButton = document.createElement("span");

    projectInfoWindow.classList.add("projectinfo");
    projectInfoWindow.classList.add("inactive");
    projectInfoInnerContainer.classList.add("innercontainer");
    projectTitle.classList.add("title");
    projectSub.classList.add("subtitle");
    projectCategory.classList.add("category");
    projectDescription.classList.add("description");
    projectAwards.classList.add("awards");
    projectMedia.classList.add("media");
    backButton.classList.add("button");
    nextButton.classList.add("button");
    projectNav.classList.add("projectnav");

    projectTitle.innerText = project.title;
    projectSub.innerText = project.subtitle;
    projectCategory.innerText = project.category;
    projectDescription.innerText = project.description;
    backButton.innerHTML = `<span class="arrow"><</span> Back to Gallery View `;
    nextButton.innerHTML = ` Next Project <span class="arrow">></span>`;

    projectInfoInnerContainer.append(
      projectTitle,
      projectSub,
      projectCategory,
      projectDescription
    );

    if (project.awards && project.awards.length > 0) {
      project.awards.forEach((award) => {
        let awardItem = document.createElement("ul");
        let awardTitle = document.createElement("li");
        let awardCategory = document.createElement("li");
        let awardProject = document.createElement("li");
        let awardCredit = document.createElement("li");

        awardTitle.classList.add("title");
        awardCategory.classList.add("category");
        awardProject.classList.add("project");
        awardCredit.classList.add("credit");

        awardTitle.innerText = `${award.status}, ${award.award}`;
        awardCategory.innerHTML = award.category;
        awardProject.innerHTML = award.project;
        awardCredit.innerHTML = award.credit;

        awardItem.append(awardTitle, awardCategory, awardProject, awardCredit);
        projectAwards.append(awardItem);
      });

      projectInfoInnerContainer.append(projectAwards);
    }

    project.media.forEach((mediaItem) => {
      if (mediaItem.includes("mp4")) {
        let video = document.createElement("video");
        video.src = mediaItem;
        video.controls = "true";
        projectMedia.append(video);
      } else {
        let image = new Image();
        image.src = mediaItem;
        projectMedia.append(image);
      }
    });

    projectInfoInnerContainer.append(projectMedia);
    projectNav.append(backButton, nextButton);

    projectInfoWindow.append(projectInfoInnerContainer);

    document.body.append(projectInfoWindow);
    setTimeout(() => {
      projectInfoWindow.classList.remove("inactive");
      document.body.append(projectNav);
    }, 1000);

    let canvas = this.app.canvas;
    let camera = this.app.camera;

    canvas.addEventListener("pointerup", exitProject);
    backButton.addEventListener("pointerup", exitProject);

    nextButton.addEventListener("pointerup", (event) => {
      gsap.to(modelRef.rotation, {
        y: Math.PI * 0.5,
        duration: 2.0,
        ease: "power2.inOut",
      });
      this.clearWindows();
      for (let lindex = 0; lindex < labProjects.length; lindex++) {
        if (labProjects[lindex].model === project.model) {
          if (lindex === labProjects.length - 1) {
            this.app.camera.moveTo(labProjects[0].model);
            this.createProjectWindow(labProjects[0]);
          } else {
            this.app.camera.moveTo(labProjects[lindex + 1].model);
            this.createProjectWindow(labProjects[lindex + 1]);
          }
          return;
        }
      }
      for (let lindex = 0; lindex < doneProjects.length; lindex++) {
        if (doneProjects[lindex].model === project.model) {
          if (lindex === doneProjects.length - 1) {
            this.app.camera.moveTo(doneProjects[0].model);
            this.createProjectWindow(doneProjects[0]);
          } else {
            this.app.camera.moveTo(doneProjects[lindex + 1].model);
            this.createProjectWindow(doneProjects[lindex + 1]);
          }
          return;
        }
      }
      for (let index = 0; index < featuredProjects.length; index++) {
        if (featuredProjects[index].model === project.model) {
          if (index === featuredProjects.length - 1) {
            this.app.camera.moveTo(featuredProjects[0].model);
            this.createProjectWindow(featuredProjects[0]);
          } else {
            this.app.camera.moveTo(featuredProjects[index + 1].model);
            this.createProjectWindow(featuredProjects[index + 1]);
          }
          return;
        }
      }
    });

    function exitProject(event) {
      event.stopPropagation();

      let moveToLocation = "main";

      gsap.to(modelRef.rotation, {
        y: Math.PI * 0.5,
        duration: 2.0,
        ease: "power2.inOut",
      });
      camera.moveTo(moveToLocation);
      projectNav.remove();
      canvas.removeEventListener("pointerup", exitProject);
    }
  }

  clearWindows() {
    let featuresCleanup = document.querySelectorAll(".projectinfo");
    let navCleanup = document.querySelectorAll(".projectnav");

    featuresCleanup.forEach((each) => {
      each.classList.add("inactive");
      setTimeout(() => {
        each.remove();
      }, 500);
    });

    navCleanup.forEach((each) => {
      each.remove();
    });
  }
}
