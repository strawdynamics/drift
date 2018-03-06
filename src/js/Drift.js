import { isDOMElement } from './util/dom';
import injectBaseStylesheet from './injectBaseStylesheet';

import Trigger from './Trigger';
import ZoomPane from './ZoomPane';

export default class Drift {
  VERSION = '1.2.0'

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
      // Whether the ZoomPane should show whitespace when near the edges.
      showWhitespaceAtEdges = false,
      // Whether the inline ZoomPane should stay inside
      // the bounds of its image.
      containInline = false,
      // How much to offset the ZoomPane from the
      // interaction point when inline.
      inlineOffsetX = 0,
      inlineOffsetY = 0,
      // A DOM element to append the inline ZoomPane to
      inlineContainer = document.body,
      // Which trigger attribute to pull the ZoomPane image source from.
      sourceAttribute = 'data-zoom',
      // How much to magnify the trigger by in the ZoomPane.
      // (e.g., `zoomFactor = 3` will result in a 900 px wide ZoomPane image
      // if the trigger is displayed at 300 px wide)
      zoomFactor = 3,
      // A DOM element to append the non-inline ZoomPane to.
      // Required if `inlinePane !== true`.
      paneContainer = document.body,
      // When to switch to an inline ZoomPane. This can be a boolean or
      // an integer. If `true`, the ZoomPane will always be inline,
      // if `false`, it will switch to inline when `windowWidth <= inlinePane`
      inlinePane = 375,
      // If `true`, touch events will trigger the zoom, like mouse events.
      handleTouch = true,
      // If present (and a function), this will be called
      // whenever the ZoomPane is shown.
      onShow = null,
      // If present (and a function), this will be called
      // whenever the ZoomPane is hidden.
      onHide = null,
      // Add base styles to the page. See the "Theming"
      // section of README.md for more information.
      injectBaseStyles = true,
      // An optional number that determines how long to wait before
      // showing the ZoomPane because of a `mouseenter` event.
      hoverDelay = 0,
      // An optional number that determines how long to wait before
      // showing the ZoomPane because of a `touchstart` event.
      // It's unlikely that you would want to use this option, since
      // "tap and hold" is much more intentional than a hover event.
      touchDelay = 0,
      // If true, a bounding box will show the area currently being previewed
      // during mouse hover
      hoverBoundingBox = false,
      // If true, a bounding box will show the area currently being previewed
      // during touch events
      touchBoundingBox = false,
    } = options;

    if (inlinePane !== true && !isDOMElement(paneContainer)) {
      throw new TypeError('`paneContainer` must be a DOM element when `inlinePane !== true`');
    }
    if(!isDOMElement(inlineContainer)){
      throw new TypeError('`inlineContainer` must be a DOM element');
    }

    this.settings = { namespace, showWhitespaceAtEdges, containInline, inlineOffsetX, inlineOffsetY, inlineContainer, sourceAttribute, zoomFactor, paneContainer, inlinePane, handleTouch, onShow, onHide, injectBaseStyles, hoverDelay, touchDelay, hoverBoundingBox, touchBoundingBox };

    if (this.settings.injectBaseStyles) {
      injectBaseStylesheet();
    }

    this._buildZoomPane();
    this._buildTrigger();
  }

  get isShowing() {
    return this.zoomPane.isShowing;
  }

  get zoomFactor() {
    return this.settings.zoomFactor;
  }

  set zoomFactor(zf) {
    this.settings.zoomFactor = zf;
    this.zoomPane.settings.zoomFactor = zf;
  }

  _buildZoomPane() {
    this.zoomPane = new ZoomPane({
      container: this.settings.paneContainer,
      zoomFactor: this.settings.zoomFactor,
      showWhitespaceAtEdges: this.settings.showWhitespaceAtEdges,
      containInline: this.settings.containInline,
      inline: this.settings.inlinePane,
      namespace: this.settings.namespace,
      inlineOffsetX: this.settings.inlineOffsetX,
      inlineOffsetY: this.settings.inlineOffsetY,
      inlineContainer: this.settings.inlineContainer
    });
  }

  _buildTrigger() {
    this.trigger = new Trigger({
      el: this.triggerEl,
      zoomPane: this.zoomPane,
      handleTouch: this.settings.handleTouch,
      onShow: this.settings.onShow,
      onHide: this.settings.onHide,
      sourceAttribute: this.settings.sourceAttribute,
      hoverDelay: this.settings.hoverDelay,
      touchDelay: this.settings.touchDelay,
      hoverBoundingBox: this.settings.hoverBoundingBox,
      touchBoundingBox: this.settings.touchBoundingBox,
      namespace: this.settings.namespace,
      zoomFactor: this.settings.zoomFactor,
    });
  }

  setZoomImageURL(imageURL) {
    this.zoomPane._setImageURL(imageURL);
  };

  disable() {
    this.trigger.enabled = false;
  }

  enable() {
    this.trigger.enabled = true;
  }

  destroy = () => {
    this.trigger._unbindEvents();
  };
}
