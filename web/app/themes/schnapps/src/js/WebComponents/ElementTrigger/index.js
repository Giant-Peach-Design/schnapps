import { LitElement, html } from "lit";

export class ElementTrigger extends LitElement {
  static get properties() {
    return {
      target: { type: String },
      toggleable: { type: Boolean },
      toggled: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.target = "";
    this.toggleable = false;
    this.toggled = false;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`<div class="bg-red-500">
      <slot @click="${this._onClick}"></slot>
    </div>`;
  }

  _onClick(e) {
    e.preventDefault();

    let togged = this.toggleable ? !this.toggled : true;

    if (this.toggleable) {
      togged = this.toggled = !this.toggled;
    }

    this.dispatchEvent(
      new CustomEvent("element:trigger", {
        detail: {
          target: this.target,
          toggled: togged,
        },
        composed: true,
        bubbles: true,
      }),
    );
  }
}

customElements.define("element-trigger", ElementTrigger);
