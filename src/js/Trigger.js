import throwIfMissing from './util/throwIfMissing';

export default class Trigger {
  constructor(options = {}) {
    let {
      el = throwIfMissing(),
      zoomPane = throwIfMissing(),
      sourceAttribute = throwIfMissing(),
      handleTouch = throwIfMissing(),
      onShow = null,
      onHide = null,
    } = options;

    this.settings = { el, zoomPane, sourceAttribute, handleTouch, onShow, onHide };

    this._bindEvents();
  }

  get isShowing() {
    return this.settings.zoomPane.isShowing;
  }

  _bindEvents() {
    this.settings.el.addEventListener('mouseenter', this._show, false);
    this.settings.el.addEventListener('mouseleave', this._hide, false);
    this.settings.el.addEventListener('mousemove', this._handleMovement, false);

    if (this.settings.handleTouch) {
      this.settings.el.addEventListener('touchstart', this._show, false);
      this.settings.el.addEventListener('touchend', this._hide, false);
      this.settings.el.addEventListener('touchmove', this._handleMovement, false);
    }
  }

  _unbindEvents() {
    this.settings.el.removeEventListener('mouseenter', this._show, false);
    this.settings.el.removeEventListener('mouseleave', this._hide, false);
    this.settings.el.removeEventListener('mousemove', this._handleMovement, false);

    if (this.settings.handleTouch) {
      this.settings.el.removeEventListener('touchstart', this._show, false);
      this.settings.el.removeEventListener('touchend', this._hide, false);
      this.settings.el.removeEventListener('touchmove', this._handleMovement, false);
    }
  }

  _show = (e) => {
    e.preventDefault();

    let onShow = this.settings.onShow
    if (onShow && typeof onShow === 'function') {
      onShow();
    }

    this.settings.zoomPane.show(
      this.settings.el.getAttribute(this.settings.sourceAttribute),
      this.settings.el.clientWidth
    );

    this._handleMovement(e);
  };

  _hide = (e) => {
    e.preventDefault();

    let onHide = this.settings.onHide
    if (onHide && typeof onHide === 'function') {
      onHide();
    }

    this.settings.zoomPane.hide()
  };

  _handleMovement = (e) => {
    e.preventDefault();

    if (!this.isShowing) {
      return;
    }

    let movementX, movementY;

    if (e.touches) {
      let firstTouch = e.touches[0];
      movementX = firstTouch.clientX;
      movementY = firstTouch.clientY;
    } else {
      movementX = e.clientX;
      movementY = e.clientY;
    }

    let el = this.settings.el;
    let rect = el.getBoundingClientRect()
    let offsetX = movementX - rect.left;
    let offsetY = movementY - rect.top;

    let percentageOffsetX = offsetX / this.settings.el.clientWidth;
    let percentageOffsetY = offsetY / this.settings.el.clientHeight;

    this.settings.zoomPane.setPosition(percentageOffsetX,
      percentageOffsetY, rect);
  };
}
