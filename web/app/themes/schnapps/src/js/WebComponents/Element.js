import { LitElement, unsafeCSS } from "lit";

// import style from "bundle-text:../../main.css";
const tailwindEl = unsafeCSS(style);

export class PeachElement extends LitElement {
  static styles = [tailwindEl];
}
