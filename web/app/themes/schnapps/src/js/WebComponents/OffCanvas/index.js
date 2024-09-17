import { LitElement, html } from "lit";

export class OffCanvas extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      id: { type: String },
      class: { type: String, reflect: true },
      backgroundClose: { type: Boolean },
      parentOpacity: { type: Number },
    };
  }

  constructor() {
    super();
    this.open = false;
    this.backgroundClose = true;
    this.parentOpacity = this.open ? 1 : 0;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(
      "element:trigger",
      this._onElementTrigger.bind(this),
    );
  }

  render() {
    return html`
      <div
        id="${this.id}"
        data-open="${this.open}"
        style="pointer-events: none; opacity: ${this.parentOpacity};"
        @click="${this._backgroundClick}"
        class="off-canvas ${this.open ? "off-canvas-open" : ""} ${this.class}"
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
      this.open = e.detail.toggled;
      this.parentOpacity = 1;
    }
  }

  _backgroundClick(e) {
    e.preventDefault();
    if (this.backgroundClose) {
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
