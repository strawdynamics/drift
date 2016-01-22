(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VERSION = undefined;

var _dom = require('./util/dom');

var _injectBaseStylesheet = require('./injectBaseStylesheet');

var _injectBaseStylesheet2 = _interopRequireDefault(_injectBaseStylesheet);

var _Trigger = require('./Trigger');

var _Trigger2 = _interopRequireDefault(_Trigger);

var _ZoomPane = require('./ZoomPane');

var _ZoomPane2 = _interopRequireDefault(_ZoomPane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VERSION = exports.VERSION = '0.1.5';

var Drift = (function () {
  function Drift(triggerEl) {
    var _this = this;

    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Drift);

    this.destroy = function () {
      _this._unbindEvents();
    };

    this.triggerEl = triggerEl;

    if (!(0, _dom.isDOMElement)(this.triggerEl)) {
      throw new TypeError('`new Drift` requires a DOM element as its first argument.');
    }

    // A bit unexpected if you haven't seen this pattern before.
    // Based on the pattern here:
    // https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#nested-defaults-destructured-and-restructured
    var _options$namespace = options.namespace;
    var
    // Prefix for generated element class names (e.g. `my-ns` will
    // result in classes such as `my-ns-pane`. Default `drift-`
    // prefixed classes will always be added as well.
    namespace = _options$namespace === undefined ? null : _options$namespace;
    var _options$showWhitespa = options.showWhitespaceAtEdges;
    var
    // Whether the ZoomPane should show whitespace when near the edges.
    showWhitespaceAtEdges = _options$showWhitespa === undefined ? false : _options$showWhitespa;
    var _options$containInlin = options.containInline;
    var
    // Whether the inline ZoomPane should stay inside
    // the bounds of its image.
    containInline = _options$containInlin === undefined ? false : _options$containInlin;
    var _options$inlineOffset = options.inlineOffsetX;
    var
    // How much to offset the ZoomPane from the
    // interaction point when inline.
    inlineOffsetX = _options$inlineOffset === undefined ? 0 : _options$inlineOffset;
    var _options$inlineOffset2 = options.inlineOffsetY;
    var inlineOffsetY = _options$inlineOffset2 === undefined ? 0 : _options$inlineOffset2;
    var _options$sourceAttrib = options.sourceAttribute;
    var
    // Which trigger attribute to pull the ZoomPane image source from.
    sourceAttribute = _options$sourceAttrib === undefined ? 'data-zoom' : _options$sourceAttrib;
    var _options$zoomFactor = options.zoomFactor;
    var
    // How much to magnify the trigger by in the ZoomPane.
    // (e.g., `zoomFactor = 3` will result in a 900 px wide ZoomPane image
    // if the trigger is displayed at 300 px wide)
    zoomFactor = _options$zoomFactor === undefined ? 3 : _options$zoomFactor;
    var _options$paneContaine = options.paneContainer;
    var
    // A DOM element to append the non-inline ZoomPane to.
    // Required if `inlinePane !== true`.
    paneContainer = _options$paneContaine === undefined ? document.body : _options$paneContaine;
    var _options$inlinePane = options.inlinePane;
    var
    // When to switch to an inline ZoomPane. This can be a boolean or
    // an integer. If `true`, the ZoomPane will always be inline,
    // if `false`, it will switch to inline when `windowWidth <= inlinePane`
    inlinePane = _options$inlinePane === undefined ? 375 : _options$inlinePane;
    var _options$handleTouch = options.handleTouch;
    var
    // If `true`, touch events will trigger the zoom, like mouse events.
    handleTouch = _options$handleTouch === undefined ? true : _options$handleTouch;
    var _options$onShow = options.onShow;
    var
    // If present (and a function), this will be called
    // whenever the ZoomPane is shown.
    onShow = _options$onShow === undefined ? null : _options$onShow;
    var _options$onHide = options.onHide;
    var
    // If present (and a function), this will be called
    // whenever the ZoomPane is hidden.
    onHide = _options$onHide === undefined ? null : _options$onHide;
    var _options$injectBaseSt = options.injectBaseStyles;
    var
    // Add base styles to the page. See the "Theming"
    // section of README.md for more information.
    injectBaseStyles = _options$injectBaseSt === undefined ? true : _options$injectBaseSt;

    if (inlinePane !== true && !(0, _dom.isDOMElement)(paneContainer)) {
      throw new TypeError('`paneContainer` must be a DOM element when `inlinePane !== true`');
    }

    this.settings = { namespace: namespace, showWhitespaceAtEdges: showWhitespaceAtEdges, containInline: containInline, inlineOffsetX: inlineOffsetX, inlineOffsetY: inlineOffsetY, sourceAttribute: sourceAttribute, zoomFactor: zoomFactor, paneContainer: paneContainer, inlinePane: inlinePane, handleTouch: handleTouch, onShow: onShow, onHide: onHide, injectBaseStyles: injectBaseStyles };

    if (this.settings.injectBaseStyles) {
      (0, _injectBaseStylesheet2.default)();
    }

    // this._bindEvents();
    this._buildZoomPane();
    this._buildTrigger();
  }

  _createClass(Drift, [{
    key: '_buildZoomPane',
    value: function _buildZoomPane() {
      this.zoomPane = new _ZoomPane2.default({
        container: this.settings.paneContainer,
        zoomFactor: this.settings.zoomFactor,
        showWhitespaceAtEdges: this.settings.showWhitespaceAtEdges,
        containInline: this.settings.containInline,
        inline: this.settings.inlinePane,
        namespace: this.settings.namespace,
        inlineOffsetX: this.settings.inlineOffsetX,
        inlineOffsetY: this.settings.inlineOffsetY
      });
    }
  }, {
    key: '_buildTrigger',
    value: function _buildTrigger() {
      this.trigger = new _Trigger2.default({
        el: this.triggerEl,
        zoomPane: this.zoomPane,
        handleTouch: this.settings.handleTouch,
        onShow: this.settings.onShow,
        onHide: this.settings.onHide,
        sourceAttribute: this.settings.sourceAttribute
      });
    }
  }, {
    key: 'isShowing',
    get: function get() {
      return this.zoomPane.isShowing;
    }
  }, {
    key: 'zoomFactor',
    get: function get() {
      return this.settings.zoomFactor;
    },
    set: function set(zf) {
      this.settings.zoomFactor = zf;
      this.zoomPane.settings.zoomFactor = zf;
    }
  }]);

  return Drift;
})();

exports.default = Drift;

global.Drift = Drift;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Trigger":2,"./ZoomPane":3,"./injectBaseStylesheet":4,"./util/dom":5}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _throwIfMissing = require('./util/throwIfMissing');

var _throwIfMissing2 = _interopRequireDefault(_throwIfMissing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Trigger = (function () {
  function Trigger() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Trigger);

    _initialiseProps.call(this);

    var _options$el = options.el;
    var el = _options$el === undefined ? (0, _throwIfMissing2.default)() : _options$el;
    var _options$zoomPane = options.zoomPane;
    var zoomPane = _options$zoomPane === undefined ? (0, _throwIfMissing2.default)() : _options$zoomPane;
    var _options$sourceAttrib = options.sourceAttribute;
    var sourceAttribute = _options$sourceAttrib === undefined ? (0, _throwIfMissing2.default)() : _options$sourceAttrib;
    var _options$handleTouch = options.handleTouch;
    var handleTouch = _options$handleTouch === undefined ? (0, _throwIfMissing2.default)() : _options$handleTouch;
    var _options$onShow = options.onShow;
    var onShow = _options$onShow === undefined ? null : _options$onShow;
    var _options$onHide = options.onHide;
    var onHide = _options$onHide === undefined ? null : _options$onHide;

    this.settings = { el: el, zoomPane: zoomPane, sourceAttribute: sourceAttribute, handleTouch: handleTouch, onShow: onShow, onHide: onHide };

    this._bindEvents();
  }

  _createClass(Trigger, [{
    key: '_bindEvents',
    value: function _bindEvents() {
      this.settings.el.addEventListener('mouseenter', this._show, false);
      this.settings.el.addEventListener('mouseleave', this._hide, false);
      this.settings.el.addEventListener('mousemove', this._handleMovement, false);

      if (this.settings.handleTouch) {
        this.settings.el.addEventListener('touchstart', this._show, false);
        this.settings.el.addEventListener('touchend', this._hide, false);
        this.settings.el.addEventListener('touchmove', this._handleMovement, false);
      }
    }
  }, {
    key: '_unbindEvents',
    value: function _unbindEvents() {
      this.settings.el.removeEventListener('mouseenter', this._show, false);
      this.settings.el.removeEventListener('mouseleave', this._hide, false);
      this.settings.el.removeEventListener('mousemove', this._handleMovement, false);

      if (this.settings.handleTouch) {
        this.settings.el.removeEventListener('touchstart', this._show, false);
        this.settings.el.removeEventListener('touchend', this._hide, false);
        this.settings.el.removeEventListener('touchmove', this._handleMovement, false);
      }
    }
  }, {
    key: 'isShowing',
    get: function get() {
      return this.settings.zoomPane.isShowing;
    }
  }]);

  return Trigger;
})();

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this._show = function (e) {
    e.preventDefault();

    var onShow = _this.settings.onShow;
    if (onShow && typeof onShow === 'function') {
      onShow();
    }

    _this.settings.zoomPane.show(_this.settings.el.getAttribute(_this.settings.sourceAttribute), _this.settings.el.clientWidth);

    _this._handleMovement(e);
  };

  this._hide = function (e) {
    e.preventDefault();

    var onHide = _this.settings.onHide;
    if (onHide && typeof onHide === 'function') {
      onHide();
    }

    _this.settings.zoomPane.hide();
  };

  this._handleMovement = function (e) {
    e.preventDefault();

    if (!_this.isShowing) {
      return;
    }

    var movementX = undefined,
        movementY = undefined;

    if (e.touches) {
      var firstTouch = e.touches[0];
      movementX = firstTouch.clientX;
      movementY = firstTouch.clientY;
    } else {
      movementX = e.clientX;
      movementY = e.clientY;
    }

    var el = _this.settings.el;
    var rect = el.getBoundingClientRect();
    var offsetX = movementX - rect.left;
    var offsetY = movementY - rect.top;

    var percentageOffsetX = offsetX / _this.settings.el.clientWidth;
    var percentageOffsetY = offsetY / _this.settings.el.clientHeight;

    _this.settings.zoomPane.setPosition(percentageOffsetX, percentageOffsetY, rect);
  };
};

exports.default = Trigger;

},{"./util/throwIfMissing":6}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _throwIfMissing = require('./util/throwIfMissing');

var _throwIfMissing2 = _interopRequireDefault(_throwIfMissing);

var _dom = require('./util/dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// All officially-supported browsers have this, but it's easy to
// account for, just in case.
var HAS_ANIMATION = 'animation' in document.createElement('div').style;

var ZoomPane = (function () {
  function ZoomPane() {
    var _this = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ZoomPane);

    this._completeShow = function () {
      _this.el.removeEventListener('animationend', _this._completeShow, false);

      (0, _dom.removeClasses)(_this.el, _this.openingClasses);
    };

    this._completeHide = function () {
      _this.el.removeEventListener('animationend', _this._completeHide, false);

      (0, _dom.removeClasses)(_this.el, _this.openClasses);
      (0, _dom.removeClasses)(_this.el, _this.closingClasses);
      (0, _dom.removeClasses)(_this.el, _this.inlineClasses);

      _this.el.setAttribute('style', '');

      // The window could have been resized above or below `inline`
      // limits since the ZoomPane was shown. Because of this, we
      // can't rely on `this._isInline` here.
      if (_this.el.parentElement === _this.settings.container) {
        _this.settings.container.removeChild(_this.el);
      } else if (_this.el.parentElement === _this.settings.inlineContainer) {
        _this.settings.inlineContainer.removeChild(_this.el);
      }
    };

    this.isShowing = false;

    var _options$container = options.container;
    var container = _options$container === undefined ? null : _options$container;
    var _options$zoomFactor = options.zoomFactor;
    var zoomFactor = _options$zoomFactor === undefined ? (0, _throwIfMissing2.default)() : _options$zoomFactor;
    var _options$inline = options.inline;
    var inline = _options$inline === undefined ? (0, _throwIfMissing2.default)() : _options$inline;
    var _options$namespace = options.namespace;
    var namespace = _options$namespace === undefined ? null : _options$namespace;
    var _options$showWhitespa = options.showWhitespaceAtEdges;
    var showWhitespaceAtEdges = _options$showWhitespa === undefined ? (0, _throwIfMissing2.default)() : _options$showWhitespa;
    var _options$containInlin = options.containInline;
    var containInline = _options$containInlin === undefined ? (0, _throwIfMissing2.default)() : _options$containInlin;
    var _options$inlineOffset = options.inlineOffsetX;
    var inlineOffsetX = _options$inlineOffset === undefined ? 0 : _options$inlineOffset;
    var _options$inlineOffset2 = options.inlineOffsetY;
    var inlineOffsetY = _options$inlineOffset2 === undefined ? 0 : _options$inlineOffset2;

    this.settings = { container: container, zoomFactor: zoomFactor, inline: inline, namespace: namespace, showWhitespaceAtEdges: showWhitespaceAtEdges, containInline: containInline, inlineOffsetX: inlineOffsetX, inlineOffsetY: inlineOffsetY };
    this.settings.inlineContainer = document.body;

    this.openClasses = this._buildClasses('open');
    this.openingClasses = this._buildClasses('opening');
    this.closingClasses = this._buildClasses('closing');
    this.inlineClasses = this._buildClasses('inline');

    this._buildElement();
  }

  _createClass(ZoomPane, [{
    key: '_buildClasses',
    value: function _buildClasses(suffix) {
      var classes = ['drift-' + suffix];

      var ns = this.settings.namespace;
      if (ns) {
        classes.push(ns + '-' + suffix);
      }

      return classes;
    }
  }, {
    key: '_buildElement',
    value: function _buildElement() {
      this.el = document.createElement('div');
      (0, _dom.addClasses)(this.el, this._buildClasses('zoom-pane'));

      var loaderEl = document.createElement('div');
      (0, _dom.addClasses)(loaderEl, this._buildClasses('zoom-pane-loader'));
      this.el.appendChild(loaderEl);

      this.imgEl = document.createElement('img');
      this.el.appendChild(this.imgEl);
    }
  }, {
    key: '_setImageURL',
    value: function _setImageURL(imageURL) {
      this.imgEl.setAttribute('src', imageURL);
    }
  }, {
    key: '_setImageSize',
    value: function _setImageSize(triggerWidth) {
      this.imgEl.style.width = triggerWidth * this.settings.zoomFactor + 'px';
    }

    // `percentageOffsetX` and `percentageOffsetY` must be percentages
    // expressed as floats between `0' and `1`.

  }, {
    key: 'setPosition',
    value: function setPosition(percentageOffsetX, percentageOffsetY, triggerRect) {
      var left = -(this.imgEl.clientWidth * percentageOffsetX - this.el.clientWidth / 2);
      var top = -(this.imgEl.clientHeight * percentageOffsetY - this.el.clientHeight / 2);
      var maxLeft = -(this.imgEl.clientWidth - this.el.clientWidth);
      var maxTop = -(this.imgEl.clientHeight - this.el.clientHeight);

      if (this.el.parentElement === this.settings.inlineContainer) {
        // This may be needed in the future to deal with browser event
        // inconsistencies, but it's difficult to tell for sure.
        // let scrollX = isTouch ? 0 : window.scrollX;
        // let scrollY = isTouch ? 0 : window.scrollY;
        var scrollX = window.scrollX;
        var scrollY = window.scrollY;

        var inlineLeft = triggerRect.left + percentageOffsetX * triggerRect.width - this.el.clientWidth / 2 + this.settings.inlineOffsetX + scrollX;
        var inlineTop = triggerRect.top + percentageOffsetY * triggerRect.height - this.el.clientHeight / 2 + this.settings.inlineOffsetY + scrollY;

        if (this.settings.containInline) {
          var elRect = this.el.getBoundingClientRect();

          if (inlineLeft < triggerRect.left + scrollX) {
            inlineLeft = triggerRect.left + scrollX;
          } else if (inlineLeft + this.el.clientWidth > triggerRect.left + triggerRect.width + scrollX) {
            inlineLeft = triggerRect.left + triggerRect.width - this.el.clientWidth + scrollX;
          }

          if (inlineTop < triggerRect.top + scrollY) {
            inlineTop = triggerRect.top + scrollY;
          } else if (inlineTop + this.el.clientHeight > triggerRect.top + triggerRect.height + scrollY) {
            inlineTop = triggerRect.top + triggerRect.height - this.el.clientHeight + scrollY;
          }
        }

        this.el.style.left = inlineLeft + 'px';
        this.el.style.top = inlineTop + 'px';
      }

      if (!this.settings.showWhitespaceAtEdges) {
        if (left > 0) {
          left = 0;
        } else if (left < maxLeft) {
          left = maxLeft;
        }

        if (top > 0) {
          top = 0;
        } else if (top < maxTop) {
          top = maxTop;
        }
      }

      this.imgEl.style.transform = 'translate(' + left + 'px, ' + top + 'px)';
    }
  }, {
    key: '_removeListenersAndResetClasses',
    value: function _removeListenersAndResetClasses() {
      this.el.removeEventListener('animationend', this._completeShow, false);
      this.el.removeEventListener('animationend', this._completeHide, false);
      (0, _dom.removeClasses)(this.el, this.openClasses);
      (0, _dom.removeClasses)(this.el, this.closingClasses);
    }
  }, {
    key: 'show',
    value: function show(imageURL, triggerWidth) {
      this._removeListenersAndResetClasses();
      this.isShowing = true;

      (0, _dom.addClasses)(this.el, this.openClasses);

      this._setImageURL(imageURL);
      this._setImageSize(triggerWidth);

      if (this._isInline) {
        this._showInline();
      } else {
        this._showInContainer();
      }

      if (HAS_ANIMATION) {
        this.el.addEventListener('animationend', this._completeShow, false);
        (0, _dom.addClasses)(this.el, this.openingClasses);
      }
    }
  }, {
    key: '_showInline',
    value: function _showInline() {
      this.settings.inlineContainer.appendChild(this.el);
      (0, _dom.addClasses)(this.el, this.inlineClasses);
    }
  }, {
    key: '_showInContainer',
    value: function _showInContainer() {
      this.settings.container.appendChild(this.el);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this._removeListenersAndResetClasses();
      this.isShowing = false;

      if (HAS_ANIMATION) {
        this.el.addEventListener('animationend', this._completeHide, false);
        (0, _dom.addClasses)(this.el, this.closingClasses);
      } else {
        (0, _dom.removeClasses)(this.el, this.openClasses);
        (0, _dom.removeClasses)(this.el, this.inlineClasses);
      }
    }
  }, {
    key: '_isInline',
    get: function get() {
      var inline = this.settings.inline;

      return inline === true || typeof inline === 'number' && window.innerWidth <= inline;
    }
  }]);

  return ZoomPane;
})();

exports.default = ZoomPane;

},{"./util/dom":5,"./util/throwIfMissing":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = injectBaseStylesheet;
var RULES = '\n@keyframes noop {  }\n\n.drift-zoom-pane.drift-open {\n  display: block;\n}\n\n.drift-zoom-pane.drift-opening, .drift-zoom-pane.drift-closing {\n  animation: noop;\n}\n\n.drift-zoom-pane {\n  position: absolute;\n  overflow: hidden;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  pointer-events: none;\n}\n\n.drift-zoom-pane-loader {\n  display: none;\n}\n\n.drift-zoom-pane img {\n  position: absolute;\n  display: block;\n}\n';

function injectBaseStylesheet() {
  if (document.querySelector('.drift-base-styles')) {
    return;
  }

  var styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.classList.add('drift-base-styles');

  styleEl.appendChild(document.createTextNode(RULES));

  var head = document.head;
  head.insertBefore(styleEl, head.firstChild);
}

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDOMElement = isDOMElement;
exports.addClasses = addClasses;
exports.removeClasses = removeClasses;

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

// This is not really a perfect check, but works fine.
// From http://stackoverflow.com/questions/384286
var HAS_DOM_2 = (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object';

function isDOMElement(obj) {
  return HAS_DOM_2 ? obj instanceof HTMLElement : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
}

function addClasses(el, classNames) {
  classNames.forEach(function (className) {
    el.classList.add(className);
  });
}

function removeClasses(el, classNames) {
  classNames.forEach(function (className) {
    el.classList.remove(className);
  });
}

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = throwIfMissing;
function throwIfMissing() {
  throw new Error('Missing parameter');
}

},{}]},{},[1]);
