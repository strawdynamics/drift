<!-- ix-docs-ignore -->
![imgix logo](https://assets.imgix.net/sdk-imgix-logo.svg)

Drift adds easy "zoom on hover" functionality to your site's images, all with lightweight, no-dependency JavaScript.

[![npm version](https://img.shields.io/npm/v/drift-zoom.svg)](https://www.npmjs.com/package/drift-zoom)
[![Build Status](https://travis-ci.org/imgix/drift.svg?branch=main)](https://travis-ci.org/imgix/drift)
[![npm](https://img.shields.io/npm/dm/drift-zoom.svg)](https://www.npmjs.com/package/drift-zoom)
[![License](https://img.shields.io/github/license/imgix/drift)](https://github.com/imgix/drift/blob/main/LICENSE.md)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors-)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fimgix%2Fdrift.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fimgix%2Fdrift?ref=badge_shield)

---
<!-- /ix-docs-ignore -->

<!-- NB: Run `npx markdown-toc README.md --maxdepth 4 | sed -e 's/[[:space:]]\{2\}/    /g' | pbcopy` to generate TOC and copy to clipboard :) -->

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Demo](#demo-)
- [Options / Defaults](#options--defaults)
- [API](#api)
    * [`Drift#disable`](#drift%23disable)
    * [`Drift#enable`](#drift%23enable)
    * [`Drift#setZoomImageURL(imageURL)`](#drift%23setzoomimageurlimageurl)
- [Theming](#theming)
- [FAQs/Examples](#faqsexamples)
    * [Disabling on Mobile](#disabling-on-mobile)
        + [CSS Solution (Recommended)](#css-solution-recommended)
        + [JS Solution](#js-solution)
    * [Use Drift with Multiple Images on the Same Page](#use-drift-with-multiple-images-on-the-same-page)
- [Browser Support](#browser-support)
- [Contributors ✨](#contributors-)
- [Meta](#meta)
- [License](#license)

## Installation

- **NPM**: `npm install drift-zoom`
- **Bower**: `bower install drift`
- **Manual**: [Download](https://github.com/imgix/drift/archive/main.zip) and use `dist/Drift.min.js` or `dist/Drift.js`

If you're using the pre-built version of Drift, it will automatically make `window.Drift` available for your use when included on your page.

If you prefer to use `require` statements and a build tool like Browserify, here are a couple examples to help:

```javascript
var Drift = require('drift-zoom');

new Drift(…);
```

If your project uses ES6, you can do the following instead:

```javascript
import Drift from 'drift-zoom';

new Drift(…);
```

## Basic Usage

Once you've installed Drift via one of the above methods, you're ready to get started. There are no dependencies, so you can just start making cool stuff. Check out the [announcement blog post](https://blog.imgix.com/2016/01/06/better-lightbox-zoom-viewer-with-imgix?utm_medium=referral&utm_source=github&utm_campaign=drift).
Here's an example of a basic implementation:

```html
<img src="https://assets.imgix.net/dog.png?w=400" data-zoom="https://assets.imgix.net/dog.png?w=1200">

<p>This is a simple description of the dog picture.</p>
```

```javascript
new Drift(document.querySelector("img"), {
  paneContainer: document.querySelector("p")
});
```

## Demo 💻💻💻
Take a peek at our [Demo Site](https://codepen.io/imgix/pen/WrRmLb).

## Options / Defaults

Here's an example of using Drift with a custom configuration. All of the listed options are displayed with their default value.

```javascript
var options = {
	// Prefix for generated element class names (e.g. `my-ns` will
	// result in classes such as `my-ns-pane`. Default `drift-`
	// prefixed classes will always be added as well.
	namespace: null,
	// Whether the ZoomPane should show whitespace when near the edges.
	showWhitespaceAtEdges: false,
	// Whether the inline ZoomPane should stay inside
	// the bounds of its image.
	containInline: false,
	// How much to offset the ZoomPane from the
	// interaction point when inline.
	inlineOffsetX: 0,
	inlineOffsetY: 0,
	// A DOM element to append the inline ZoomPane to.
	inlineContainer: document.body,
	// Which trigger attribute to pull the ZoomPane image source from.
	sourceAttribute: 'data-zoom',
	// How much to magnify the trigger by in the ZoomPane.
	// (e.g., `zoomFactor: 3` will result in a 900 px wide ZoomPane image
	// if the trigger is displayed at 300 px wide)
	zoomFactor: 3,
	// A DOM element to append the non-inline ZoomPane to.
	// Required if `inlinePane !== true`.
	paneContainer: document.body,
	// When to switch to an inline ZoomPane. This can be a boolean or
	// an integer. If `true`, the ZoomPane will always be inline,
	// if `false`, it will switch to inline when `windowWidth <= inlinePane`
	inlinePane: 375,
	// If `true`, touch events will trigger the zoom, like mouse events.
	handleTouch: true,
	// If present (and a function), this will be called
	// whenever the ZoomPane is shown.
	onShow: null,
	// If present (and a function), this will be called
	// whenever the ZoomPane is hidden.
	onHide: null,
	// Add base styles to the page. See the "Theming"
	// section of README.md for more information.
	injectBaseStyles: true,
	// An optional number that determines how long to wait before
	// showing the ZoomPane because of a `mouseenter` event.
	hoverDelay: 0,
	// An optional number that determines how long to wait before
	// showing the ZoomPane because of a `touchstart` event.
	// Setting this to a reasonable amount will allow users to execute
	// scroll-gestures events on touch-enabled devices with the image as
	// a starting point
	touchDelay: 0,
	// If true, a bounding box will show the area currently being previewed
	// during mouse hover
	hoverBoundingBox: false,
	// If true, a bounding box will show the area currently being previewed
	// during touch events
	touchBoundingBox: false,
	// A DOM element to append the bounding box to.
	boundingBoxContainer: document.body,
	// If true, the events related to handleTouch use passive listeners in
	// order to improve performance for touch devices.
	passive: false,
};

new Drift(document.querySelector('img'), options);
```

## API

### `Drift#disable`

Disable your Drift instance. This will prevent your Drift instance from showing, but will not hide it if it's currently visible.

```javascript
var drift = new Drift(document.querySelector("img"), {
  paneContainer: document.querySelector("p")
});

document.querySelector(".disable-button").addEventListener("click", function() {
  drift.disable();
});
```

### `Drift#enable`

Enable your Drift instance.

```javascript
var drift = new Drift(document.querySelector("img"), {
  paneContainer: document.querySelector("p")
});

document.querySelector(".enable-button").addEventListener("click", function() {
  drift.enable();
});
```

### `Drift#setZoomImageURL(imageURL)`

Change the URL of the zoom image to the passed string. This only has a visible effect while your Drift is currently open. When opening, Drift always pulls the zoom image URL from the specified `sourceAttribute`. If you want to make a "permanent" change that will persist after the user leaves and re-enters your Drift trigger, you update its `sourceAttribute` as well (default `data-zoom`). For more information about this method, please see [issue #42](https://github.com/imgix/drift/issues/42).

```javascript
var triggerEl = document.querySelector("img");
var drift = new Drift(triggerEl, {
  paneContainer: document.querySelector("p")
});

var frames = ["https://mysite.com/frame1.jpg", "https://mysite.com/frame2.jpg", "https://mysite.com/frame3.jpg"];

var currentFrame = 0;

setInterval(function() {
  currentFrame++;

  if (currentFrame > frames.length - 1) {
    currentFrame = 0;
  }

  drift.setZoomImageURL(frames[currentFrame]);
  triggerEl.setAttribute("data-zoom", frames[currentFrame]);
}, 1200);
```

## Theming

By default, Drift injects an extremely basic set of styles into the page. You will almost certainly want to extend these basic styles for a prettier, more usable experience that matches your site. There is an included basic theme that may meet your needs, or at least give a good example of how to build out your own custom styles. The `namespace` option can be used as a way to easily apply different themes to specific instances of Drift.

If you need to do something very out of the ordinary, or just prefer to include the default styles in CSS yourself, you can pass `injectBaseStyles: false` when instantiating a new instance of Drift. Please note that if you disable the included base styles, you will still need to provide an animation for `.drift-window.drift-opening` and `.drift-window.drift-closing` (this can be a "noop" style animation, as seen in the base styles source).

## FAQs/Examples

In this section we answer common questions about Drift.

### Disabling on Mobile

If you would like the touch events not to fire on mobile for one reason or another, these two solutions should work for you.

#### CSS Solution (Recommended)

This solution places a transparent element over the image on mobiles to block touch events. Replace `1024px` in the media query with your mobile breakpoint.

```css
.zoom-image {
	position: relative;
}

.zoom-image::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: transparent;
}

@media only screen and (min-width: 1024px) {
	.zoom-image::before {
		display: none;
	}
}
```

#### JS Solution

This solution creates and destroys the Drift instance when the browser size changes. It depends on the library [responsive.js](https://www.responsivejs.com/) but can easily be altered to use vanilla JS.

```js
const driftOptions = {
	paneContainer: paneContainer,
	inlinePane: false,
	handleTouch: false
};

const handleChange = () => {
	requestAnimationFrame(() => {
		if (Responsive.is('mobile') && !!window.productZoom) {
			window.productZoom.destroy();
		} else {
			window.productZoom = new Drift(img, driftOptions);
		}
	})
}

window.addEventListener('resize', handleChange);
window.addEventListener('load', handleChange);

```

### Use Drift with Multiple Images on the Same Page

This code will iterate over all elements on your page with the class `drift-img`, and will instantiate Drift for each element. You can update the query selector and pane as you see fit.

```js
const driftImgs = document.querySelectorAll('.drift-img');
const pane = document.querySelector('.drift-pane');
driftImgs.map(img => {
	new Drift(img, {
		paneContainer: pane,
		inlinePane: false
	});
});
```

## Browser Support

We support the latest version of Google Chrome (which [automatically updates](https://support.google.com/chrome/answer/95414) whenever it detects that a new version of the browser is available). We also support the current and previous major releases of desktop Firefox, Internet Explorer, and Safari on a rolling basis. Mobile support is tested on the most recent minor version of the current and previous major release for the default browser on iOS and Android (e.g., iOS 9.2 and 8.4). Each time a new version is released, we begin supporting that version and stop supporting the third most recent version.

## Contributors ✨
<!-- ix-docs-ignore -->

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://paulstraw.com"><img src="https://avatars2.githubusercontent.com/u/117288?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Paul Straw</b></sub></a><br /><a href="https://github.com/imgix/drift/commits?author=paulstraw" title="Documentation">📖</a> <a href="https://github.com/imgix/drift/commits?author=paulstraw" title="Code">💻</a> <a href="#maintenance-paulstraw" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/sherwinski"><img src="https://avatars3.githubusercontent.com/u/15919091?v=4?s=100" width="100px;" alt=""/><br /><sub><b>sherwinski</b></sub></a><br /><a href="https://github.com/imgix/drift/commits?author=sherwinski" title="Code">💻</a> <a href="https://github.com/imgix/drift/commits?author=sherwinski" title="Documentation">📖</a> <a href="#maintenance-sherwinski" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/frederickfogerty"><img src="https://avatars0.githubusercontent.com/u/615334?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Frederick Fogerty</b></sub></a><br /><a href="https://github.com/imgix/drift/commits?author=frederickfogerty" title="Code">💻</a> <a href="https://github.com/imgix/drift/commits?author=frederickfogerty" title="Documentation">📖</a> <a href="#maintenance-frederickfogerty" title="Maintenance">🚧</a></td>
    <td align="center"><a href="http://jayeb.com"><img src="https://avatars2.githubusercontent.com/u/609840?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jason Eberle</b></sub></a><br /><a href="https://github.com/imgix/drift/commits?author=jayeb" title="Code">💻</a> <a href="https://github.com/imgix/drift/commits?author=jayeb" title="Documentation">📖</a> <a href="#maintenance-jayeb" title="Maintenance">🚧</a></td>
    <td align="center"><a href="http://www.luisball.com"><img src="https://avatars.githubusercontent.com/u/16711614?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Luis H. Ball Jr.</b></sub></a><br /><a href="#maintenance-luqven" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- /ix-docs-ignore -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Meta

Drift was made by [imgix](https://imgix.com?utm_medium=referral&utm_source=github&utm_campaign=drift). It's licensed under the BSD 2-Clause license (see the [license file](https://github.com/imgix/drift/blob/main/LICENSE.md) for more info). Any contribution is absolutely welcome, but please review the [contribution guidelines](https://github.com/imgix/drift/blob/main/CONTRIBUTING.md) before getting started.

## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fimgix%2Fdrift.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fimgix%2Fdrift?ref=badge_large)
