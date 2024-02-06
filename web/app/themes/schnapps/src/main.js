import { inView, animate } from "motion";
import Alpine from "alpinejs";
import intersect from "@alpinejs/intersect";
import "./main.css";
import Navigation from "./Blocks/HeaderNavigation/navigation";

Alpine.plugin(intersect);

window.Alpine = Alpine;
Alpine.start();

const domReady = () => {
  Navigation();
  const banner = document.querySelectorAll(".banner");
  let transitionableBlocks = document.querySelectorAll(".transition-block");

  if (banner.length) {
    import("./blocks/banner/banner.js").then(({ default: Banner }) => {
      Banner();
    });
  }

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
        { opactiy: 1, transform: "none" },
        { delay: 0.2, duration: 0.5, easing: [0.25, 0.1, 0.25, 1] },
      );

      return () => {
        animate(
          target,
          { opactiy: 0, transform: "translateY(60px)" },
          { duration: 0.5, easing: [0.25, 0.1, 0.25, 1] },
        );
      };
    });
  });
};

document.addEventListener("DOMContentLoaded", domReady);
