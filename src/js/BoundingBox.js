import throwIfMissing from './util/throwIfMissing';

export default class BoundingBox {
  constructor() {
    this.isShowing = false;

    let {
      namespace = null,
      zoomFactor = throwIfMissing()
    } = options;

    this.settings = { namespace, zoomFactor };

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

    // TODO set size here (zoomPaneWidth / this.settings.zoomFactor,
    // zoomPaneHeight / this.settings.zoomFactor). The

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
