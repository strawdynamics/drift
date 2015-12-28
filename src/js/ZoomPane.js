import throwIfMissing from './util/throwIfMissing';
import { addClasses, removeClasses } from './util/dom';

// All officially-supported browsers have this, but it's easy to
// account for, just in case.
const HAS_ANIMATION = 'animation' in document.body.style;

export default class ZoomPane {
  constructor(options = {}) {
    this.isShowing = false;

    let {
      container = null,
      inlineContainer = throwIfMissing(),
      inline = throwIfMissing(),
      namespace = null,
    } = options;

    this.settings = { container, inlineContainer, inline, namespace };

    this.openClasses = this._buildClasses('open');
    this.openingClasses = this._buildClasses('opening');
    this.closingClasses = this._buildClasses('closing');
    this.inlineClasses = this._buildClasses('inline');

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
    addClasses(this.el, this._buildClasses('zoom-pane'))
  }

  get _isInline() {
    let inline = this.settings.inline;

    return inline === true || (typeof inline === 'number' && window.innerWidth <= inline);
  }

  show() {
    addClasses(this.el, this.openClasses);

    if (this._isInline) {
      this._showInline();
    } else {
      this._showInContainer();
    }

    if (HAS_ANIMATION) {
      this.el.addEventListener('animationend', this._completeShow, false);
      addClasses(this.el, this.openingClasses);
    }
  }

  _showInline() {
    this.settings.inlineContainer.appendChild(this.el);
    addClasses(this.el, this.inlineClasses);
  }

  _showInContainer() {
    this.settings.container.appendChild(this.el);
  }

  hide() {
    if (HAS_ANIMATION) {
      this.el.addEventListener('animationend', this._completeHide, false);
      addClasses(this.el, this.closingClasses);
    } else {
      removeClasses(this.el, this.openClasses);
    }
  }

  _completeShow = () => {
    this.el.removeEventListener('animationend', this._completeShow, false);

    this.isShowing = true;

    removeClasses(this.el, this.openingClasses);
  }

  _completeHide = () => {
    this.el.removeEventListener('animationend', this._completeHide, false);

    this.isShowing = false;

    removeClasses(this.el, this.openClasses);
    removeClasses(this.el, this.closingClasses);
    removeClasses(this.el, this.inlineClasses);

    // The window could have been resized above or below `inline`
    // limits since the ZoomPane was shown. Because of this, we
    // can't rely on `this._isInline` here.
    if (this.el.parentElement == this.settings.container) {
      this.settings.container.removeChild(this.el);
    } else if (this.el.parentElement == this.settings.inlineContainer) {
      this.settings.inlineContainer.removeChild(this.el);
    }
  }
}
