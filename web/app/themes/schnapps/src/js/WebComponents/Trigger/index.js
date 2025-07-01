import { html } from "lit";
import { Elem, ProjectElem } from "../Element";

export class Trigger extends ProjectElem {
  static get properties() {
    return {
      target: { type: String },
      toggled: { type: Boolean },
      invert: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.target = "";
    this.toggled = false;
    this.invert = false;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`<slot @click="${this._onClick}"></slot>`;
  }

  _onClick(e) {
    e.preventDefault();

    let togged = true;

    this.dispatchEvent(
      new CustomEvent("element:trigger", {
        detail: {
          target: this.target,
          state: this.invert ? !togged : togged,
        },
        composed: true,
        bubbles: true,
      }),
    );
  }
}

customElements.define("peach-trigger", Trigger);
