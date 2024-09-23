import { PeachElement } from "../Element";
import { html } from "lit";
import { AccordionItem } from "./item";

/**
 * @element gp-accordion
 * @slot default - The accordion items
 * @property {String} type - "single" or "multiple", defaults to "single"
 */
export class Accordion extends PeachElement {
  static get properties() {
    return {
      type: { type: String }, // "single" or "multiple"
    };
  }

  constructor() {
    super();
    this.type = "single";
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("accordion:click", this._onToggle.bind(this));
  }

  _onToggle(e) {
    if (this.type === "single") {
      [...this.children].forEach((child) => {
        if (child._id !== e.detail.id) {
          child.open = false;
        }
      });
    }
  }

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("gp-accordion", Accordion);
