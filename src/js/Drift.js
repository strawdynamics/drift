import { isDOMElement } from './util/dom';
import injectBaseStylesheet from './injectBaseStylesheet';

export const VERSION = '0.1.0';

export default class Drift {
  constructor(trigger, options = {}) {
    this.isShowing = false;

    this.trigger = trigger;

    if (!isDOMElement(this.trigger)) {
      throw new TypeError('`new Drift` requires a DOM element as its first argument.');
    }

    // A bit unexpected if you haven't seen this pattern before.
    // Based on the pattern here:
    // https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#nested-defaults-destructured-and-restructured
    let {
      // Prefix for generated element class names (e.g. `my-ns` will
      // result in classes such as `my-ns-lightbox`. Default `lum-`
      // prefixed classes will always be added as well.
      namespace = null,
      // Which attribute to pull the lightbox image source from.
      sourceAttribute = 'href',
      // The event to listen to on the _trigger_ element: triggers opening.
      openTrigger = 'click',
      // The event to listen to on the _lightbox_ element: triggers closing.
      closeTrigger = 'click',
      // Allow closing by pressing escape.
      closeWithEscape = true,
      // A selector defining what to append the lightbox element to.
      appendToSelector = 'body',
      // If present (and a function), this will be called
      // whenever the lightbox is opened.
      onShow = null,
      // If present (and a function), this will be called
      // whenever the lightbox is closed.
      onHide = null,
      // When true, adds the `imgix-fluid` class to the `img`
      // inside the lightbox. See https://github.com/imgix/imgix.js
      // for more information.
      includeImgixJSClass = false,
      // Add base styles to the page. See the "Theming"
      // section of README.md for more information.
      injectBaseStyles = true,
    } = options

    this.settings = { namespace, sourceAttribute, openTrigger, closeTrigger, closeWithEscape, appendToSelector, onShow, onHide, includeImgixJSClass, injectBaseStyles }

    if (this.settings.injectBaseStyles) {
      injectBaseStylesheet();
    }

    this._bindEvents();
  }

  _show = (e) => {
    e.preventDefault();

    let onShow = this.settings.onShow
    if (onShow && typeof onShow === 'function') {
      onShow();
    }

    this.isShowing = true;
  }

  _hide = (e) => {
    e.preventDefault();

    let onHide = this.settings.onHide
    if (onHide && typeof onHide === 'function') {
      onHide();
    }

    this.isShowing = false;
  }

  _bindEvents() {

  }

  _unbindEvents() {

  }

  destroy = () => {
    this._unbindEvents();
  }
}

global.Drift = Drift;
