import ZoomPane from '../src/js/ZoomPane';
import Trigger from '../src/js/Trigger';

import { mockEvent, zoomPaneOptions, triggerOptions } from './helpers';

beforeEach(function() {
  let anchor = document.createElement('a');
  anchor.classList.add('test-anchor');
  anchor.setAttribute('href', 'http://assets.imgix.net/test.png&w=400');
  anchor.dataset.zoom = 'http://assets.imgix.net/test.png&w=1200';
  document.body.appendChild(anchor);
});

afterEach(function() {
  let anchor = document.querySelector('.test-anchor');

  document.body.removeChild(anchor);
});

describe('Trigger', () => {
  it('returns an instance of `Trigger` when correctly instantiated', () => {
    let trigger = new Trigger(triggerOptions());

    expect(trigger.constructor).toBe(Trigger);
  });

  it('requires `el` option', () => {
    let opts = triggerOptions();
    delete opts.el;

    expect(() => {
      new Trigger(opts)
    }).toThrowError(Error, 'Missing parameter');
  });

  it('requires `zoomPane` option', () => {
    let opts = triggerOptions();
    delete opts.zoomPane;

    expect(() => {
      new Trigger(opts)
    }).toThrowError(Error, 'Missing parameter');
  });

  it('requires `sourceAttribute` option', () => {
    let opts = triggerOptions();
    delete opts.sourceAttribute;

    expect(() => {
      new Trigger(opts)
    }).toThrowError(Error, 'Missing parameter');
  });

  it('requires `handleTouch` option', () => {
    let opts = triggerOptions();
    delete opts.handleTouch;

    expect(() => {
      new Trigger(opts)
    }).toThrowError(Error, 'Missing parameter');
  });

  it('executes the `onShow` callback when present', () => {
    let called = false;
    function showCallback() {
      called = true;
    }
    let opts = triggerOptions();
    opts.onShow = showCallback;

    let trigger = new Trigger(opts);
    trigger._show(mockEvent);

    expect(called).toBe(true);
  });

  it('executes the `onHide` callback when present', () => {
    let called = false;
    function hideCallback() {
      called = true;
    }

    let opts = triggerOptions();
    opts.onHide = hideCallback;

    let trigger = new Trigger(opts);
    trigger._show(mockEvent);
    trigger._hide(mockEvent);

    expect(called).toBe(true);
  });
});
