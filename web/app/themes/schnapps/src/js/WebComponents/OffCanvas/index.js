import { LitElement, html } from "lit";

export class OffCanvas extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      id: { type: String },
      class: { type: String, reflect: true },
      backgroundClose: { type: Boolean },
      parentOpacity: { type: Number },
      _hasDuration: { type: Boolean },
    };
  }

  get _slottedChildren() {
    const slot = this.shadowRoot.querySelector("slot");
    return slot?.assignedElements({ flatten: true });
  }

  constructor() {
    super();
    this.open = false;
    this.backgroundClose = true;
    this.parentOpacity = this.open ? 1 : 0;
    this._hasDuration = false;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener(
      "element:trigger",
      this._onElementTrigger.bind(this),
    );
  }

  firstUpdated() {
    if (this._slottedChildren?.length) {
      this._hasDuration =
        getComputedStyle(this._slottedChildren[0]).transitionDuration !== "0s";
    }
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
      if (e.detail.toggleable && !this._hasDuration) {
        // if the slot element doesn't have a transition duration
        let open = e.detail.toggled;
        this.open = open;
        this.parentOpacity = open ? 1 : 0;
        return;
      }

      // otherwise, set the open state and parent opacity
      // close state should be handled by the transitionEnd event
      this.open = e.detail.toggled;
      this.parentOpacity = this.open;
      return;
    }
  }

  _backgroundClick(e) {
    e.preventDefault();

    if (e.target.assignedSlot && this.backgroundClose) {
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
