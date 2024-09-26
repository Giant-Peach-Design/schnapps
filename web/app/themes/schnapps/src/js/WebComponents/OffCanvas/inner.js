import { html } from "lit";
import { PeachElement } from "../Element";

export class OffCanvasInner extends PeachElement {
  static get properties() {
    return {
      class: { type: String, reflect: true },
      orientation: { type: String },
      open: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.orientation = "left";
  }

  get classes() {
    const clses = {
      "off-canvas-inner": true,
      "transition-all": true,
      "duration-500": true,
      "bg-white": true,
      absolute: true,
      "max-w-full": true,
      "top-0": true,
      "bottom-0": true,
      "overflow-y-auto": true,
      "off-canvas-open:translate-x-0": true,
      "delay-50": true,
      "w-[400px]": true,
    };

    if (this.orientation === "left") {
      clses["left-0"] = true;
      clses["-translate-x-full"] = true;
    }

    if (this.orientation === "right") {
      clses["right-0"] = true;
      clses["translate-x-full"] = true;
    }

    return Object.keys(clses)
      .filter((cls) => clses[cls])
      .join(" ");
  }

  render() {
    return html`
      <div class="${this.classes}" data-open="${this.open}">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("peach-off-canvas-inner", OffCanvasInner);
