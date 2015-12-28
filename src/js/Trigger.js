import throwIfMissing from './util/throwIfMissing';

export default class Trigger {
  constructor(options = {}) {
    let {
      el = throwIfMissing(),
      zoomPane = throwIfMissing(),
      onShow = null,
      onHide = null,
    } = options;

    this.settings = { el, zoomPane, onShow, onHide };

    this._bindEvents();
  }

  _bindEvents() {
    this.settings.el.addEventListener('mouseenter', this._show, false);
    this.settings.el.addEventListener('mouseleave', this._hide, false);
  }

  _unbindEvents() {
    this.settings.el.removeEventListener('mouseenter', this._show, false);
    this.settings.el.removeEventListener('mouseleave', this._hide, false);
  }

  _show = (e) => {
    console.log('triggershow');
    e.preventDefault();

    let onShow = this.settings.onShow
    if (onShow && typeof onShow === 'function') {
      onShow();
    }

    this.settings.zoomPane.show()
  }

  _hide = (e) => {
    console.log('triggerhide');
    e.preventDefault();

    let onHide = this.settings.onHide
    if (onHide && typeof onHide === 'function') {
      onHide();
    }

    this.settings.zoomPane.hide()
  }
}
