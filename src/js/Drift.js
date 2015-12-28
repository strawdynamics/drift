import { isDOMElement } from './util/dom';
import injectBaseStylesheet from './injectBaseStylesheet';

import Trigger from './Trigger';
import ZoomPane from './ZoomPane';

export const VERSION = '0.1.0';

export default class Drift {
  constructor(triggerEl, options = {}) {
    this.triggerEl = triggerEl;

    if (!isDOMElement(this.triggerEl)) {
      throw new TypeError('`new Drift` requires a DOM element as its first argument.');
    }

    // A bit unexpected if you haven't seen this pattern before.
    // Based on the pattern here:
    // https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#nested-defaults-destructured-and-restructured
    let {
      // Prefix for generated element class names (e.g. `my-ns` will
      // result in classes such as `my-ns-pane`. Default `drift-`
      // prefixed classes will always be added as well.
      namespace = null,
      // Which attribute to pull the ZoomPane image source from.
      sourceAttribute = 'data-zoom',
      // A DOM element to append the non-inline ZoomPane to.
      // Required if `inlinePane !== true`.
      paneContainer = null,
      // When to switch to an inline ZoomPane. This can be a boolean or
      // an integer. If `true`, the ZoomPane will always be inline,
      // if `false`, it will switch to inline when `windowWidth <= inlinePane`
      inlinePane = 375,
      // The element to attach the inline ZoomPane to.
      inlineContainer = document.body,
      // If present (and a function), this will be called
      // whenever the ZoomPane is shown.
      onShow = null,
      // If present (and a function), this will be called
      // whenever the ZoomPane is hidden.
      onHide = null,
      // Add base styles to the page. See the "Theming"
      // section of README.md for more information.
      injectBaseStyles = true,
    } = options;

    if (inlinePane !== true && !isDOMElement(paneContainer)) {
      throw new TypeError('`paneContainer` must be a DOM element when `inlinePane !== true`');
    }

    this.settings = { namespace, sourceAttribute, paneContainer, inlinePane, inlineContainer, onShow, onHide, injectBaseStyles };

    if (this.settings.injectBaseStyles) {
      injectBaseStylesheet();
    }

    // this._bindEvents();
    this._buildZoomPane();
    this._buildTrigger();
  }

  get isShowing() {
    return this.zoomPane.isShowing;
  }

  _buildZoomPane() {
    this.zoomPane = new ZoomPane({
      container: this.settings.paneContainer,
      inlineContainer: this.settings.inlineContainer,
      inline: this.settings.inlinePane,
      namespace: this.settings.namespace,
    });
  }

  _buildTrigger() {
    this.trigger = new Trigger({
      el: this.triggerEl,
      zoomPane: this.zoomPane,
      onShow: this.settings.onShow,
      onHide: this.settings.onHide,
    });
  }

  destroy = () => {
    this._unbindEvents();
  }
}

global.Drift = Drift;
