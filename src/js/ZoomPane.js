import throwIfMissing from "./util/throwIfMissing";
import { addClasses, removeClasses } from "./util/dom";

// All officially-supported browsers have this, but it's easy to
// account for, just in case.
const divStyle = document.createElement("div").style;

const HAS_ANIMATION =
  typeof document === "undefined" ? false : "animation" in divStyle || "webkitAnimation" in divStyle;

export default class ZoomPane {
  constructor(options = {}) {
    this._completeShow = this._completeShow.bind(this);
    this._completeHide = this._completeHide.bind(this);
    this._handleLoad = this._handleLoad.bind(this);

    this.isShowing = false;

    const {
      container = null,
      zoomFactor = throwIfMissing(),
      inline = throwIfMissing(),
      namespace = null,
      showWhitespaceAtEdges = throwIfMissing(),
      containInline = throwIfMissing(),
      inlineOffsetX = 0,
      inlineOffsetY = 0,
      inlineContainer = document.body,
    } = options;

    this.settings = {
      container,
      zoomFactor,
      inline,
      namespace,
      showWhitespaceAtEdges,
      containInline,
      inlineOffsetX,
      inlineOffsetY,
      inlineContainer,
    };

    this.openClasses = this._buildClasses("open");
    this.openingClasses = this._buildClasses("opening");
    this.closingClasses = this._buildClasses("closing");
    this.inlineClasses = this._buildClasses("inline");
    this.loadingClasses = this._buildClasses("loading");

    this._buildElement();
  }

  _buildClasses(suffix) {
    const classes = [`drift-${suffix}`];

    const ns = this.settings.namespace;
    if (ns) {
      classes.push(`${ns}-${suffix}`);
    }

    return classes;
  }

  _buildElement() {
    this.el = document.createElement("div");
    addClasses(this.el, this._buildClasses("zoom-pane"));

    const loaderEl = document.createElement("div");
    addClasses(loaderEl, this._buildClasses("zoom-pane-loader"));
    this.el.appendChild(loaderEl);

    this.imgEl = document.createElement("img");
    this.el.appendChild(this.imgEl);
  }

  _setImageURL(imageURL) {
    this.imgEl.setAttribute("src", imageURL);
  }

  _setImageSize(triggerWidth, triggerHeight) {
    this.imgEl.style.width = `${triggerWidth * this.settings.zoomFactor}px`;
    this.imgEl.style.height = `${triggerHeight * this.settings.zoomFactor}px`;
  }

  // `percentageOffsetX` and `percentageOffsetY` must be percentages
  // expressed as floats between `0' and `1`.
  setPosition(percentageOffsetX, percentageOffsetY, triggerRect) {
    const imgElWidth = this.imgEl.offsetWidth;
    const imgElHeight = this.imgEl.offsetHeight;
    const elWidth = this.el.offsetWidth;
    const elHeight = this.el.offsetHeight;

    const centreOfContainerX = elWidth / 2;
    const centreOfContainerY = elHeight / 2;

    const targetImgXToBeCentre = imgElWidth * percentageOffsetX;
    const targetImgYToBeCentre = imgElHeight * percentageOffsetY;

    let left = centreOfContainerX - targetImgXToBeCentre;
    let top = centreOfContainerY - targetImgYToBeCentre;

    const differenceBetweenContainerWidthAndImgWidth = elWidth - imgElWidth;
    const differenceBetweenContainerHeightAndImgHeight = elHeight - imgElHeight;
    const isContainerLargerThanImgX = differenceBetweenContainerWidthAndImgWidth > 0;
    const isContainerLargerThanImgY = differenceBetweenContainerHeightAndImgHeight > 0;

    const minLeft = isContainerLargerThanImgX ? differenceBetweenContainerWidthAndImgWidth / 2 : 0;
    const minTop = isContainerLargerThanImgY ? differenceBetweenContainerHeightAndImgHeight / 2 : 0;

    const maxLeft = isContainerLargerThanImgX
      ? differenceBetweenContainerWidthAndImgWidth / 2
      : differenceBetweenContainerWidthAndImgWidth;
    const maxTop = isContainerLargerThanImgY
      ? differenceBetweenContainerHeightAndImgHeight / 2
      : differenceBetweenContainerHeightAndImgHeight;

    if (this.el.parentElement === this.settings.inlineContainer) {
      // This may be needed in the future to deal with browser event
      // inconsistencies, but it's difficult to tell for sure.
      // let scrollX = isTouch ? 0 : window.scrollX;
      // let scrollY = isTouch ? 0 : window.scrollY;
      const scrollX = window.pageXOffset;
      const scrollY = window.pageYOffset;

      let inlineLeft =
        triggerRect.left + percentageOffsetX * triggerRect.width - elWidth / 2 + this.settings.inlineOffsetX + scrollX;
      let inlineTop =
        triggerRect.top + percentageOffsetY * triggerRect.height - elHeight / 2 + this.settings.inlineOffsetY + scrollY;

      if (this.settings.containInline) {
        if (inlineLeft < triggerRect.left + scrollX) {
          inlineLeft = triggerRect.left + scrollX;
        } else if (inlineLeft + elWidth > triggerRect.left + triggerRect.width + scrollX) {
          inlineLeft = triggerRect.left + triggerRect.width - elWidth + scrollX;
        }

        if (inlineTop < triggerRect.top + scrollY) {
          inlineTop = triggerRect.top + scrollY;
        } else if (inlineTop + elHeight > triggerRect.top + triggerRect.height + scrollY) {
          inlineTop = triggerRect.top + triggerRect.height - elHeight + scrollY;
        }
      }

      this.el.style.left = `${inlineLeft}px`;
      this.el.style.top = `${inlineTop}px`;
    }

    if (!this.settings.showWhitespaceAtEdges) {
      if (left > minLeft) {
        left = minLeft;
      } else if (left < maxLeft) {
        left = maxLeft;
      }

      if (top > minTop) {
        top = minTop;
      } else if (top < maxTop) {
        top = maxTop;
      }
    }

    this.imgEl.style.transform = `translate(${left}px, ${top}px)`;
    this.imgEl.style.webkitTransform = `translate(${left}px, ${top}px)`;
  }

  get _isInline() {
    const inline = this.settings.inline;

    return inline === true || (typeof inline === "number" && window.innerWidth <= inline);
  }

  _removeListenersAndResetClasses() {
    this.el.removeEventListener("animationend", this._completeShow, false);
    this.el.removeEventListener("animationend", this._completeHide, false);
    this.el.removeEventListener("webkitAnimationEnd", this._completeShow, false);
    this.el.removeEventListener("webkitAnimationEnd", this._completeHide, false);
    removeClasses(this.el, this.openClasses);
    removeClasses(this.el, this.closingClasses);
  }

  show(imageURL, triggerWidth, triggerHeight) {
    this._removeListenersAndResetClasses();
    this.isShowing = true;

    addClasses(this.el, this.openClasses);

    if (this.imgEl.getAttribute("src") != imageURL) {
      addClasses(this.el, this.loadingClasses);
      this.imgEl.addEventListener("load", this._handleLoad, false);
      this._setImageURL(imageURL);
    }

    this._setImageSize(triggerWidth, triggerHeight);

    if (this._isInline) {
      this._showInline();
    } else {
      this._showInContainer();
    }

    if (HAS_ANIMATION) {
      this.el.addEventListener("animationend", this._completeShow, false);
      this.el.addEventListener("webkitAnimationEnd", this._completeShow, false);
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
    this._removeListenersAndResetClasses();
    this.isShowing = false;

    if (HAS_ANIMATION) {
      this.el.addEventListener("animationend", this._completeHide, false);
      this.el.addEventListener("webkitAnimationEnd", this._completeHide, false);
      addClasses(this.el, this.closingClasses);
    } else {
      removeClasses(this.el, this.openClasses);
      removeClasses(this.el, this.inlineClasses);
    }
  }

  _completeShow() {
    this.el.removeEventListener("animationend", this._completeShow, false);
    this.el.removeEventListener("webkitAnimationEnd", this._completeShow, false);

    removeClasses(this.el, this.openingClasses);
  }

  _completeHide() {
    this.el.removeEventListener("animationend", this._completeHide, false);
    this.el.removeEventListener("webkitAnimationEnd", this._completeHide, false);

    removeClasses(this.el, this.openClasses);
    removeClasses(this.el, this.closingClasses);
    removeClasses(this.el, this.inlineClasses);

    this.el.style = "";

    // The window could have been resized above or below `inline`
    // limits since the ZoomPane was shown. Because of this, we
    // can't rely on `this._isInline` here.
    if (this.el.parentElement === this.settings.container) {
      this.settings.container.removeChild(this.el);
    } else if (this.el.parentElement === this.settings.inlineContainer) {
      this.settings.inlineContainer.removeChild(this.el);
    }
  }

  _handleLoad() {
    this.imgEl.removeEventListener("load", this._handleLoad, false);
    removeClasses(this.el, this.loadingClasses);
  }
}
