import { Elem, ProjectElem } from "../Element";
import { html, unsafeCSS, css } from "lit";
import style from "blaze-slider/dist/blaze.css";
import BlazeSlider from "./bs.js";

const blazeStyle = unsafeCSS(style);

export class Slider extends ProjectElem {
  static styles = [
    blazeStyle,
    ProjectElem.styles,
    css`
      ::slotted(*) {
        flex-shrink: 0;
        width: var(--slide-width);
      }
    `,
  ];

  static get properties() {
    return {
      _config: { type: Object },
      slider: { type: Object },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._config = {
      slidesToShow: 1,
      all: {
        enableAutoplay: true,
        slidesToShow: 1,
        enablePagination: false,
      },
      // ...config,
    };
  }

  firstUpdated() {
    this.slider = new BlazeSlider(
      this.shadowRoot.querySelector(".blaze-slider"),
      this._config,
    );
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="blaze-slider w-full relative">
        <div class="blaze-container">
          <div class="blaze-track-container cursor-grab">
            <slot
              class="blaze-track {% if isAdmin %} overflow-x-scroll flex {% endif %}"
            ></slot>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("peach-slider", Slider);
