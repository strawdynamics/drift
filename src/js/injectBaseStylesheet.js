const RULES = `
@keyframes noop {
  0% { zoom: 1; }
}

@-webkit-keyframes noop {
  0% { zoom: 1; }
}

.drift-zoom-pane.drift-open {
  display: block;
}

.drift-zoom-pane.drift-opening, .drift-zoom-pane.drift-closing {
  animation: noop 1ms;
  -webkit-animation: noop 1ms;
}

.drift-zoom-pane {
  position: absolute;
  overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}

.drift-zoom-pane-loader {
  display: none;
}

.drift-zoom-pane img {
  position: absolute;
  display: block;
  max-width: none;
  max-height: none;
}

.drift-bounding-box {
  position: absolute;
  pointer-events: none;
}
`

export default function injectBaseStylesheet() {
  if (document.querySelector('.drift-base-styles')) {
    return;
  }

  let styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.classList.add('drift-base-styles');

  styleEl.appendChild(document.createTextNode(RULES));

  let head = document.head;
  head.insertBefore(styleEl, head.firstChild);
}
