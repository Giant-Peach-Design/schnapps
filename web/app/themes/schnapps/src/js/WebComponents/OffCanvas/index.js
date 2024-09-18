import { PeachElement } from "../Element";
import { html } from "lit";

export class OffCanvas extends PeachElement {
  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      id: { type: String },
      class: { type: String, reflect: true },
      backgroundClose: { type: Boolean },
      parentOpacity: { type: Number },
      _hasDuration: { type: Boolean },
      _backgroundElement: { type: Object },
    };
  }

  constructor() {
    super();
    this.open = false;
    this.backgroundClose = true;
    this.parentOpacity = this.open ? 1 : 0;
    this._hasDuration = true;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(
      "element:trigger",
      this._onElementTrigger.bind(this),
    );
  }

  firstUpdated() {
    this._backgroundElement = this.shadowRoot.querySelector(".off-canvas");
  }

  get classes() {
    // object of wrapper classes, each class is a boolean
    // if the class is true, it will be added to the element

    const clses = {
      "off-canvas": true,
      open: this.open,
      "pointer-events-auto": this.open,
      "pointer-events-none": !this.open,
      fixed: true,
      "inset-0": true,
      "transition-all": true,
      "duration-500": true,
      "opacity-0": true,
      "off-canvas-open:opacity-100": this.open,
      "off-canvas-open:bg-black/25": this.open,
    };

    // return a string of classes that are true
    return Object.keys(clses)
      .filter((cls) => clses[cls])
      .join(" ");
  }

  render() {
    return html`
      <div
        id="${this.id}"
        data-open="${this.open}"
        style="opacity: ${this.parentOpacity};"
        @click="${this._backgroundClick}"
        class="${this.classes}"
      >
        <slot
          @transitionEnd="${this._transitionEnd}"
          style="pointer-events: ${this.open ? "auto" : "none"};"
        ></slot>
      </div>
    `;
  }

  _onElementTrigger(e) {
    if (e.detail.target === this.id) {
      this.open = e.detail.state;
      this.parentOpacity = this.open;
      return;
    }
  }

  _backgroundClick(e) {
    e.preventDefault();

    if (this.backgroundClose && e.target === this._backgroundElement) {
      this.open = false;
    }
  }

  _transitionEnd(e) {
    if (!this.open) {
      this.parentOpacity = 0;
    }
  }
}

customElements.define("off-canvas", OffCanvas);
