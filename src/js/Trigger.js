import throwIfMissing from "./util/throwIfMissing";
import BoundingBox from "./BoundingBox";

export default class Trigger {
  constructor(options = {}) {
    this._show = this._show.bind(this);
    this._hide = this._hide.bind(this);
    this._handleEntry = this._handleEntry.bind(this);
    this._handleMovement = this._handleMovement.bind(this);

    const {
      el = throwIfMissing(),
      zoomPane = throwIfMissing(),
      sourceAttribute = throwIfMissing(),
      handleTouch = throwIfMissing(),
      onShow = null,
      onHide = null,
      hoverDelay = 0,
      touchDelay = 0,
      hoverBoundingBox = throwIfMissing(),
      touchBoundingBox = throwIfMissing(),
      namespace = null,
      zoomFactor = throwIfMissing(),
      boundingBoxContainer = throwIfMissing(),
      passive = false,
    } = options;

    this.settings = {
      el,
      zoomPane,
      sourceAttribute,
      handleTouch,
      onShow,
      onHide,
      hoverDelay,
      touchDelay,
      hoverBoundingBox,
      touchBoundingBox,
      namespace,
      zoomFactor,
      boundingBoxContainer,
      passive,
    };

    if (this.settings.hoverBoundingBox || this.settings.touchBoundingBox) {
      this.boundingBox = new BoundingBox({
        namespace: this.settings.namespace,
        zoomFactor: this.settings.zoomFactor,
        containerEl: this.settings.boundingBoxContainer,
      });
    }

    this.enabled = true;

    this._bindEvents();
  }

  get isShowing() {
    return this.settings.zoomPane.isShowing;
  }

  _preventDefault(event) {
    event.preventDefault();
  }

  _preventDefaultAllowTouchScroll(event) {
    if (!this.settings.touchDelay || !this._isTouchEvent(event) || this.isShowing) {
      event.preventDefault();
    }
  }

  _isTouchEvent(event) {
    return !!event.touches;
  }

  _bindEvents() {
    this.settings.el.addEventListener("mouseenter", this._handleEntry, false);
    this.settings.el.addEventListener("mouseleave", this._hide, false);
    this.settings.el.addEventListener("mousemove", this._handleMovement, false);

    const isPassive = { passive: this.settings.passive };
    if (this.settings.handleTouch) {
      this.settings.el.addEventListener("touchstart", this._handleEntry, isPassive);
      this.settings.el.addEventListener("touchend", this._hide, false);
      this.settings.el.addEventListener("touchmove", this._handleMovement, isPassive);
    } else {
      this.settings.el.addEventListener("touchstart", this._preventDefault, isPassive);
      this.settings.el.addEventListener("touchend", this._preventDefault, false);
      this.settings.el.addEventListener("touchmove", this._preventDefault, isPassive);
    }
  }

  _unbindEvents() {
    this.settings.el.removeEventListener("mouseenter", this._handleEntry, false);
    this.settings.el.removeEventListener("mouseleave", this._hide, false);
    this.settings.el.removeEventListener("mousemove", this._handleMovement, false);

    if (this.settings.handleTouch) {
      this.settings.el.removeEventListener("touchstart", this._handleEntry, false);
      this.settings.el.removeEventListener("touchend", this._hide, false);
      this.settings.el.removeEventListener("touchmove", this._handleMovement, false);
    } else {
      this.settings.el.removeEventListener("touchstart", this._preventDefault, false);
      this.settings.el.removeEventListener("touchend", this._preventDefault, false);
      this.settings.el.removeEventListener("touchmove", this._preventDefault, false);
    }
  }

  _handleEntry(e) {
    this._preventDefaultAllowTouchScroll(e);
    this._lastMovement = e;

    if (e.type == "mouseenter" && this.settings.hoverDelay) {
      this.entryTimeout = setTimeout(this._show, this.settings.hoverDelay);
    } else if (this.settings.touchDelay) {
      this.entryTimeout = setTimeout(this._show, this.settings.touchDelay);
    } else {
      this._show();
    }
  }

  _show() {
    if (!this.enabled) {
      return;
    }

    const onShow = this.settings.onShow;
    if (onShow && typeof onShow === "function") {
      onShow();
    }

    this.settings.zoomPane.show(
      this.settings.el.getAttribute(this.settings.sourceAttribute),
      this.settings.el.clientWidth,
      this.settings.el.clientHeight
    );

    if (this._lastMovement) {
      const touchActivated = this._lastMovement.touches;
      if ((touchActivated && this.settings.touchBoundingBox) || (!touchActivated && this.settings.hoverBoundingBox)) {
        this.boundingBox.show(this.settings.zoomPane.el.clientWidth, this.settings.zoomPane.el.clientHeight);
      }
    }

    this._handleMovement();
  }

  _hide(e) {
    if (e) {
      this._preventDefaultAllowTouchScroll(e);
    }

    this._lastMovement = null;

    if (this.entryTimeout) {
      clearTimeout(this.entryTimeout);
    }

    if (this.boundingBox) {
      this.boundingBox.hide();
    }

    const onHide = this.settings.onHide;
    if (onHide && typeof onHide === "function") {
      onHide();
    }

    this.settings.zoomPane.hide();
  }

  _handleMovement(e) {
    if (e) {
      this._preventDefaultAllowTouchScroll(e);
      this._lastMovement = e;
    } else if (this._lastMovement) {
      e = this._lastMovement;
    } else {
      return;
    }

    let movementX;
    let movementY;

    if (e.touches) {
      const firstTouch = e.touches[0];
      movementX = firstTouch.clientX;
      movementY = firstTouch.clientY;
    } else {
      movementX = e.clientX;
      movementY = e.clientY;
    }

    const el = this.settings.el;
    const rect = el.getBoundingClientRect();
    const offsetX = movementX - rect.left;
    const offsetY = movementY - rect.top;

    const percentageOffsetX = offsetX / this.settings.el.clientWidth;
    const percentageOffsetY = offsetY / this.settings.el.clientHeight;

    if (this.boundingBox) {
      this.boundingBox.setPosition(percentageOffsetX, percentageOffsetY, rect);
    }

    this.settings.zoomPane.setPosition(percentageOffsetX, percentageOffsetY, rect);
  }
}
