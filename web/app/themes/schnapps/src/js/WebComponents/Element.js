/**
 * Custom LitElement base class with dynamic styling capabilities
 *
 * This module provides a flexible base class for creating web components
 * that can have styles dynamically applied at class definition time.
 *
 * TODO: make this into a library that can be used in other projects
 */

import { html, LitElement, unsafeCSS } from "lit";
// this would be specific per project
import style from "../entrypoints/main.css?inline";
// const tailwindEl = unsafeCSS(style);

/**
 * Base element class that extends LitElement with dynamic styling capabilities
 *
 * This class provides a foundation for creating web components that can have
 * CSS styles dynamically applied through a factory pattern.
 */
export class Elem extends LitElement {
  /**
   * Static property to hold the stylesheet for this element class
   * @type {string|null}
   */
  static styleSheet = null;

  /**
   * LitElement styles getter that applies the dynamically set stylesheet
   * @returns {Array} Array of CSS styles to be applied to the element
   */
  static get styles() {
    return this.styleSheet ? [unsafeCSS(this.styleSheet)] : [];
  }

  /**
   * Factory method to create a new element class with specific styles
   *
   * This method allows for creating element classes with pre-defined styles
   * without modifying the original base class.
   *
   * @param {string} styleSheet - CSS stylesheet string to apply to the new class
   * @returns {Class} New element class that extends this one with the provided styles
   */
  static withStyles(styleSheet) {
    const ExtendedElem = class extends this {};
    ExtendedElem.styleSheet = styleSheet;
    return ExtendedElem;
  }

  /**
   * Called when the element is added to the DOM
   *
   * Removes the 'cloak' attribute which is typically used to hide elements
   * during initial loading/styling to prevent FOUC (Flash of Unstyled Content)
   */
  connectedCallback() {
    super.connectedCallback();
    this.removeAttribute("cloak");
  }
}

/**
 * Project-specific element class with main stylesheet applied
 *
 * This is a pre-configured element class that includes the main project
 * CSS styles. Use this as a base for components that need access to the
 * full project stylesheet.
 */
export const ProjectElem = Elem.withStyles(style);
