import ZoomPane from '../src/js/ZoomPane';

import { zoomPaneOptions } from './helpers';

describe('ZoomPane', () => {
  it('returns an instance of `ZoomPane` when correctly instantiated', () => {
    let zoomPane = new ZoomPane(zoomPaneOptions());

    expect(zoomPane.constructor).toBe(ZoomPane);
  });

  it('requires `zoomFactor` option', () => {
    let opts = zoomPaneOptions();
    delete opts.zoomFactor;

    expect(() => {
      new ZoomPane(opts)
    }).toThrowError(Error, 'Missing parameter');
  });

  it('requires `inline` option', () => {
    let opts = zoomPaneOptions();
    delete opts.inline;

    expect(() => {
      new ZoomPane(opts)
    }).toThrowError(Error, 'Missing parameter');
  });

  it('requires `showWhitespaceAtEdges` option', () => {
    let opts = zoomPaneOptions();
    delete opts.showWhitespaceAtEdges;

    expect(() => {
      new ZoomPane(opts)
    }).toThrowError(Error, 'Missing parameter');
  });

  it('requires `containInline` option', () => {
    let opts = zoomPaneOptions();
    delete opts.containInline;

    expect(() => {
      new ZoomPane(opts)
    }).toThrowError(Error, 'Missing parameter');
  });

  it('builds its element', () => {
    let opts = zoomPaneOptions();
    opts.namespace = 'tb';
    let zoomPane = new ZoomPane(opts);

    expect(zoomPane.el.classList.toString()).toBe('drift-zoom-pane tb-zoom-pane');
  });

  it('creates an `img` element inside its main element', () => {
    let zoomPane = new ZoomPane(zoomPaneOptions());

    expect(zoomPane.imgEl.parentElement).toBe(zoomPane.el);
  });

  it('sets the `imgEl` `src` attribute when `#show` is called', () => {
    let zoomPane = new ZoomPane(zoomPaneOptions());
    let testSrc = 'http://assets.imgix.net/unsplash/pretty2.jpg'

    zoomPane.show(testSrc, 400)

    expect(zoomPane.imgEl.getAttribute('src')).toBe(testSrc);
  });

  it('sets the `imgEl` width attribute when `#show` is called', () => {
    let zoomPane = new ZoomPane(zoomPaneOptions());
    let testSrc = 'http://assets.imgix.net/unsplash/pretty2.jpg'
    let triggerWidth = 400;

    zoomPane.show(testSrc, triggerWidth);

    expect(zoomPane.imgEl.style.width).toBe(`${triggerWidth * zoomPane.settings.zoomFactor}px`);
  });
});
