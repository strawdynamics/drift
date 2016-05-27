import BoundingBox from '../src/js/BoundingBox';

import { boundingBoxOptions } from './helpers';

describe('BoundingBox', () => {
  it('returns an instance of `BoundingBox` when correctly instantiated', () => {
    let zoomPane = new BoundingBox(boundingBoxOptions());

    expect(zoomPane.constructor).toBe(BoundingBox);
  });

  it('requires `zoomFactor` option', () => {
    let opts = boundingBoxOptions();
    delete opts.zoomFactor;

    expect(() => {
      new BoundingBox(opts)
    }).toThrowError(Error, 'Missing parameter');
  });

  it('requires `containerEl` option', () => {
    let opts = boundingBoxOptions();
    delete opts.containerEl;

    expect(() => {
      new BoundingBox(opts)
    }).toThrowError(Error, 'Missing parameter');
  });

  it('builds its element', () => {
    let opts = boundingBoxOptions();
    opts.namespace = 'tb';
    let zoomPane = new BoundingBox(opts);

    expect(zoomPane.el.classList.toString()).toBe('drift-bounding-box tb-bounding-box');
  });
});
