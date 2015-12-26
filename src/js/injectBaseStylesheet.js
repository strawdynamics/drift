const RULES = `
@keyframes noop {  }

.lum-lightbox {
  position: fixed;
  display: none;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.lum-lightbox.lum-open {
  display: block;
}

.lum-lightbox.lum-opening, .lum-lightbox.lum-closing {
  animation: noop;
}

.lum-lightbox-inner {
  position: absolute;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;

  overflow: hidden;
}

.lum-lightbox-inner img {
  max-width: 100%;
  max-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
}
`

export default function injectBaseStylesheet() {
  if (document.querySelector('.lum-base-styles')) {
    return;
  }

  let styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.classList.add('lum-base-styles');

  styleEl.appendChild(document.createTextNode(RULES));

  let head = document.head;
  head.insertBefore(styleEl, head.firstChild);
}
