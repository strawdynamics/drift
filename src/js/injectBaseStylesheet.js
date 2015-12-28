const RULES = `
@keyframes noop {  }

.drift-zoom-pane.drift-open {
  display: block;
}

.drift-zoom-pane.drift-opening, .drift-zoom-pane.drift-closing {
  animation: noop;
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
