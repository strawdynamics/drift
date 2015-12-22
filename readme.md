![imgix logo](https://assets.imgix.net/imgix-logo-web-2014.pdf?page=2&fm=png&w=200&h=200)

# Drift [![Build Status](https://travis-ci.org/imgix/drift.svg?branch=master)](https://travis-ci.org/imgix/drift)

Easily add "zoom on hover" functionality to your site's images. Lightweight, no-dependency JavaScript.

* [Installation](#installation)
* [Usage](#usage)
* [Options / Defaults](#options-defaults)
* [Browser Support](#browser-support)
* [Meta](#meta)


<a name="installation"></a>
## Installation

* **NPM**: `npm install drift-zoom`
* **Bower**: `bower install drift`
* **cdnjs**: `https://cdnjs.cloudflare.com/ajax/libs/drift/0.1.0/dist/drift.min.js`
* **Manual**: [Download](https://github.com/imgix/drift/archive/master.zip) and use `dist/drift.min.js` or `dist/drift.js`


<a name="usage"></a>
## Usage

Once you've installed Drift via one of the above methods, you're ready to get started. There are no dependencies, so you can just start making cool stuff. Check out the [announcement blog post](http://blog.imgix.com/TODO) for a demo and full explanation of how to implement Drift into your site or app.


<a name="options-defaults"></a>
## Options / Defaults

``` javascript
var defaults = {
	lorem: 'ipsum', // a description of this feature
	dolor: 'sit' // a description of this feature
};
```


<a name="browser-support"></a>
## Browser Support

We support the latest version of Google Chrome (which [automatically updates](https://support.google.com/chrome/answer/95414) whenever it detects that a new version of the browser is available). We also support the current and previous major releases of Firefox, Internet Explorer, and Safari on a rolling basis. Each time a new version is released, we begin supporting that version and stop supporting the third most recent version.


<a name="meta"></a>
## Meta

Drift was made by [imgix](http://imgix.com). It's MIT-licensed (see the [license file](https://github.com/imgix/drift/blob/master/license.md) for more info). Any contribution is absolutely welcome, but please review the [contribution guidelines](https://github.com/imgix/drift/blob/master/contributing.md) before getting started.
