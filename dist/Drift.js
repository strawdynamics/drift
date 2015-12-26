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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VERSION = exports.VERSION = '0.1.0';

var Drift = (function () {
  function Drift(trigger) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Drift);

    _initialiseProps.call(this);

    this.isShowing = false;

    this.trigger = trigger;

    if (!(0, _dom.isDOMElement)(this.trigger)) {
      throw new TypeError('`new Drift` requires a DOM element as its first argument.');
    }

    // A bit unexpected if you haven't seen this pattern before.
    // Based on the pattern here:
    // https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20&%20beyond/ch2.md#nested-defaults-destructured-and-restructured
    var _options$namespace = options.namespace;
    var
    // Prefix for generated element class names (e.g. `my-ns` will
    // result in classes such as `my-ns-lightbox`. Default `lum-`
    // prefixed classes will always be added as well.
    namespace = _options$namespace === undefined ? null : _options$namespace;
    var _options$sourceAttrib = options.sourceAttribute;
    var
    // Which attribute to pull the lightbox image source from.
    sourceAttribute = _options$sourceAttrib === undefined ? 'href' : _options$sourceAttrib;
    var _options$openTrigger = options.openTrigger;
    var
    // The event to listen to on the _trigger_ element: triggers opening.
    openTrigger = _options$openTrigger === undefined ? 'click' : _options$openTrigger;
    var _options$closeTrigger = options.closeTrigger;
    var
    // The event to listen to on the _lightbox_ element: triggers closing.
    closeTrigger = _options$closeTrigger === undefined ? 'click' : _options$closeTrigger;
    var _options$closeWithEsc = options.closeWithEscape;
    var
    // Allow closing by pressing escape.
    closeWithEscape = _options$closeWithEsc === undefined ? true : _options$closeWithEsc;
    var _options$appendToSele = options.appendToSelector;
    var
    // A selector defining what to append the lightbox element to.
    appendToSelector = _options$appendToSele === undefined ? 'body' : _options$appendToSele;
    var _options$onShow = options.onShow;
    var
    // If present (and a function), this will be called
    // whenever the lightbox is opened.
    onShow = _options$onShow === undefined ? null : _options$onShow;
    var _options$onHide = options.onHide;
    var
    // If present (and a function), this will be called
    // whenever the lightbox is closed.
    onHide = _options$onHide === undefined ? null : _options$onHide;
    var _options$includeImgix = options.includeImgixJSClass;
    var
    // When true, adds the `imgix-fluid` class to the `img`
    // inside the lightbox. See https://github.com/imgix/imgix.js
    // for more information.
    includeImgixJSClass = _options$includeImgix === undefined ? false : _options$includeImgix;
    var _options$injectBaseSt = options.injectBaseStyles;
    var
    // Add base styles to the page. See the "Theming"
    // section of README.md for more information.
    injectBaseStyles = _options$injectBaseSt === undefined ? true : _options$injectBaseSt;

    this.settings = { namespace: namespace, sourceAttribute: sourceAttribute, openTrigger: openTrigger, closeTrigger: closeTrigger, closeWithEscape: closeWithEscape, appendToSelector: appendToSelector, onShow: onShow, onHide: onHide, includeImgixJSClass: includeImgixJSClass, injectBaseStyles: injectBaseStyles };

    if (this.settings.injectBaseStyles) {
      (0, _injectBaseStylesheet2.default)();
    }

    this._bindEvents();
  }

  _createClass(Drift, [{
    key: '_bindEvents',
    value: function _bindEvents() {}
  }, {
    key: '_unbindEvents',
    value: function _unbindEvents() {}
  }]);

  return Drift;
})();

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this._show = function (e) {
    e.preventDefault();

    var onShow = _this.settings.onShow;
    if (onShow && typeof onShow === 'function') {
      onShow();
    }

    _this.isShowing = true;
  };

  this._hide = function (e) {
    e.preventDefault();

    var onHide = _this.settings.onHide;
    if (onHide && typeof onHide === 'function') {
      onHide();
    }

    _this.isShowing = false;
  };

  this.destroy = function () {
    _this._unbindEvents();
  };
};

exports.default = Drift;

global.Drift = Drift;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./injectBaseStylesheet":2,"./util/dom":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = injectBaseStylesheet;
var RULES = '\n@keyframes noop {  }\n\n.lum-lightbox {\n  position: fixed;\n  display: none;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.lum-lightbox.lum-open {\n  display: block;\n}\n\n.lum-lightbox.lum-opening, .lum-lightbox.lum-closing {\n  animation: noop;\n}\n\n.lum-lightbox-inner {\n  position: absolute;\n  top: 0%;\n  right: 0%;\n  bottom: 0%;\n  left: 0%;\n\n  overflow: hidden;\n}\n\n.lum-lightbox-inner img {\n  max-width: 100%;\n  max-height: 100%;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  display: block;\n}\n';

function injectBaseStylesheet() {
  if (document.querySelector('.lum-base-styles')) {
    return;
  }

  var styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.classList.add('lum-base-styles');

  styleEl.appendChild(document.createTextNode(RULES));

  var head = document.head;
  head.insertBefore(styleEl, head.firstChild);
}

},{}],3:[function(require,module,exports){
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
var hasDOM2 = (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === 'object';

function isDOMElement(obj) {
  return hasDOM2 ? obj instanceof HTMLElement : obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === 'string';
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

},{}]},{},[1]);
