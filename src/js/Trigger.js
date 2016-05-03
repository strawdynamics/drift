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
      hoverDelay = 0,
      touchDelay = 0
    } = options;

    this.settings = { el, zoomPane, sourceAttribute, handleTouch, onShow, onHide, hoverDelay, touchDelay };

    this._bindEvents();
  }

  get isShowing() {
    return this.settings.zoomPane.isShowing;
  }

  _bindEvents() {
    this.settings.el.addEventListener('mouseenter', this._handleEntry, false);
    this.settings.el.addEventListener('mouseleave', this._hide, false);
    this.settings.el.addEventListener('mousemove', this._handleMovement, false);

    if (this.settings.handleTouch) {
      this.settings.el.addEventListener('touchstart', this._handleEntry, false);
      this.settings.el.addEventListener('touchend', this._hide, false);
      this.settings.el.addEventListener('touchmove', this._handleMovement, false);
    }
  }

  _unbindEvents() {
    this.settings.el.removeEventListener('mouseenter', this._handleEntry, false);
    this.settings.el.removeEventListener('mouseleave', this._hide, false);
    this.settings.el.removeEventListener('mousemove', this._handleMovement, false);

    if (this.settings.handleTouch) {
      this.settings.el.removeEventListener('touchstart', this._handleEntry, false);
      this.settings.el.removeEventListener('touchend', this._hide, false);
      this.settings.el.removeEventListener('touchmove', this._handleMovement, false);
    }
  }

  _handleEntry = (e) => {
    e.preventDefault();
    this._lastMovement = e;

    if (e.type == 'mouseenter' && this.settings.hoverDelay) {
      this.entryTimeout = setTimeout(this._show, this.settings.hoverDelay);
    } else if (this.settings.touchDelay) {
      this.entryTimeout = setTimeout(this._show, this.settings.touchDelay);
    } else {
      this._show();
    }
  };

  _show = () => {
    let onShow = this.settings.onShow
    if (onShow && typeof onShow === 'function') {
      onShow();
    }

    this.settings.zoomPane.show(
      this.settings.el.getAttribute(this.settings.sourceAttribute),
      this.settings.el.clientWidth,
      this.settings.el.clientHeight
    );

    this._handleMovement();
  }

  _hide = (e) => {
    e.preventDefault();

    this._lastMovement = null;

    if (this.entryTimeout) {
      clearTimeout(this.entryTimeout);
    }

    let onHide = this.settings.onHide
    if (onHide && typeof onHide === 'function') {
      onHide();
    }

    this.settings.zoomPane.hide()
  };

  _handleMovement = (e) => {
    if (e) {
      e.preventDefault();
      this._lastMovement = e;
    } else if (this._lastMovement) {
      e = this._lastMovement;
    } else {
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
