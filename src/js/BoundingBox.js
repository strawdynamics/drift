import throwIfMissing from './util/throwIfMissing';

export default class BoundingBox {
  constructor() {
    this.isShowing = false;

    let {
      namespace = null,
    } = options;

    this.settings = { namespace };

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

    // TODO set aspect ratio based on zoomPaneWidth and zoomPaneHeight. The
    // default size of BoundingBox should come from CSS, and we'll only change
    // the _height_ in order to match the ZoomPane aspect ratio.

    addClasses(this.el, this.openClasses);
  }

  hide() {
    e.preventDefault();

    this.isShowing = false;

    removeClasses(this.el, this.openClasses);
  }

  setPosition(percentageOffsetX, percentageOffsetY, triggerRect) {
    // TODO this logic should be similar to ZoomPane when it's inline
  }
}
