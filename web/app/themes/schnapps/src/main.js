import { inView, animate } from "motion";
import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";
import Navigation from "./Blocks/Header/navigation";
import "./main.css";

Alpine.plugin(intersect);

window.Alpine = Alpine;
Alpine.start();

const domReady = () => {
  Navigation();
  initModules();
  initAnimations();
};


/*

Each module should be treated as an individual block. 
Please pass each node as module param. 
Module path is case-sensitive. Wrong path will throw an error on dev server after running `npm run build`.

*/
function initModules() {
  // Banner
  const bannerBlocks = document.querySelectorAll(".giantpeach-banner");
  if (bannerBlocks.length) {
    import("./blocks/Banner/banner.js").then(({ default: Banner }) => {
      bannerBlocks.forEach(node => {
        Banner(node);
      });
    });
  }
}

function initAnimations() {
  let transitionableBlocks = document.querySelectorAll(".transition-block");
  let inViewStop = inView(transitionableBlocks, ({ target }) => {
    animate(
      target,
      { opacity: 1, transform: "none" },
      { delay: 0.2, duration: 0.5, easing: [0.25, 0.1, 0.25, 1] },
    );

    return () => {
      animate(
        target,
        { opacity: 0, transform: "translateY(60px)" },
        { duration: 0.5, easing: [0.25, 0.1, 0.25, 1] },
      );
    };
  });

  document.addEventListener("block:load", () => {
    transitionableBlocks = document.querySelectorAll(".transition-block");
    inViewStop();
    inViewStop = inView(transitionableBlocks, ({ target }) => {
      animate(
        target,
        { opacity: 1, transform: "none" },
        { delay: 0.2, duration: 0.5, easing: [0.25, 0.1, 0.25, 1] },
      );

      return () => {
        animate(
          target,
          { opacity: 0, transform: "translateY(60px)" },
          { duration: 0.5, easing: [0.25, 0.1, 0.25, 1] },
        );
      };
    });
  });
}

document.addEventListener("DOMContentLoaded", domReady);
