import throwIfMissing from './util/throwIfMissing';
import { addClasses, removeClasses } from './util/dom';

export default class BoundingBox {
  constructor(options) {
    this.isShowing = false;

    let {
      namespace = null,
      zoomFactor = throwIfMissing(),
      containerEl = throwIfMissing(),
    } = options;

    this.settings = { namespace, zoomFactor, containerEl };

    this.openClasses = this._buildClasses('open');

    this._buildElement();
  }

  _buildClasses(suffix) {
    let classes = [`drift-${suffix}`];

    let ns = this.settings.namespace;
    if (ns) {
      classes.push(`${ns}-${suffix}`);
    }

    return classes;
  }

  _buildElement() {
    this.el = document.createElement('div');
    addClasses(this.el, this._buildClasses('bounding-box'));
  }

  show(zoomPaneWidth, zoomPaneHeight) {
    this.isShowing = true;

    this.settings.containerEl.appendChild(this.el);

    let style = this.el.style;
    style.width = `${Math.round(zoomPaneWidth / this.settings.zoomFactor)}px`;
    style.height = `${Math.round(zoomPaneHeight / this.settings.zoomFactor)}px`;

    addClasses(this.el, this.openClasses);
  }

  hide() {
    if (this.isShowing) {
      this.settings.containerEl.removeChild(this.el);
    }

    this.isShowing = false;

    removeClasses(this.el, this.openClasses);
  }

  setPosition(percentageOffsetX, percentageOffsetY, triggerRect) {
    let scrollX = window.scrollX;
    let scrollY = window.scrollY;

    let inlineLeft = triggerRect.left + (percentageOffsetX * triggerRect.width)
      - (this.el.clientWidth / 2) + scrollX;
    let inlineTop = triggerRect.top + (percentageOffsetY * triggerRect.height)
      - (this.el.clientHeight / 2) + scrollY;

    let elRect = this.el.getBoundingClientRect();

    if (inlineLeft < triggerRect.left + scrollX) {
      inlineLeft = triggerRect.left + scrollX;
    } else if (inlineLeft + this.el.clientWidth > triggerRect.left + triggerRect.width + scrollX) {
      inlineLeft = triggerRect.left + triggerRect.width - this.el.clientWidth + scrollX;
    }

    if (inlineTop < triggerRect.top + scrollY) {
      inlineTop = triggerRect.top + scrollY;
    } else if (inlineTop + this.el.clientHeight > triggerRect.top + triggerRect.height + scrollY) {
      inlineTop = triggerRect.top + triggerRect.height - this.el.clientHeight + scrollY;
    }

    this.el.style.left = `${inlineLeft}px`;
    this.el.style.top = `${inlineTop}px`;
  }
}
