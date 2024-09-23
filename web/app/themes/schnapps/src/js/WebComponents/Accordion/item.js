import { PeachElement } from "../Element";
import { html } from "lit";

function slugify(str) {
  return str.toLowerCase().replace(/\s/g, "-");
}

/**
 * @element gp-accordion-item
 * @slot header - The header of the accordion item
 * @slot content - The content of the accordion item
 *
 * This element will automatically use the first child element as the header
 * and any other children as the content.
 */
export class AccordionItem extends PeachElement {
  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      _id: { type: String },
      id: { type: String },
    };
  }

  constructor() {
    super();
    this.open = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this._distributeChildren();
  }

  _distributeChildren() {
    // get first child
    if (this.children.length > 0) {
      this.children[0].setAttribute("slot", "header");
      this._id = slugify(this.children[0].textContent);
      this.id = this._id;
    }

    // get all other children
    if (this.children.length > 1) {
      for (let i = 1; i < this.children.length; i++) {
        this.children[i].setAttribute("slot", "content");
      }
    }
  }

  update(changedProperties) {
    super.update(changedProperties);
    console.log(changedProperties);

    //if (changedProperties.has("open")) {
    //  if (changedProperties.open == false) {

    //  }
    //}
  }

  get innerClasses() {
    const clses = {
      grid: true,
      "grid-rows-[0fr]": !this.open,
      "grid-rows-[1fr]": this.open,
      "transition-all": true,
      "duration-500": true,
    };

    return Object.keys(clses)
      .filter((cls) => clses[cls])
      .join(" ");
  }

  _toggle() {
    this.open = !this.open;

    this.dispatchEvent(
      new CustomEvent("accordion:click", {
        detail: {
          open: this.open,
          id: this._id,
        },
        composed: true,
        bubbles: true,
      }),
    );
  }

  render() {
    return html`
      <div>
        <dt>
          <button
            @click="${this._toggle}"
            aria-controls="${this._id}"
            ?aria-expanded="${this.open}"
          >
            <slot name="header"></slot>
          </button>
        </dt>
        <dd id="${this._id}" class="${this.innerClasses}">
          <div class="overflow-hidden">
            <slot name="content"></slot>
          </div>
        </dd>
      </div>
    `;
  }
}

customElements.define("gp-accordion-item", AccordionItem);
