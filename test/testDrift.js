import Drift from '../src/js/Drift';

import { defaultDriftConfig } from './helpers';

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

describe('Drift', () => {
  describe('core', () => {
    it('throws if no arguments are passed', () => {
      expect(() => {
        new Drift;
      }).toThrowError(TypeError, '`new Drift` requires a DOM element as its first argument.')
    });

    it('throws if the first argument is not a DOM element', () => {
      expect(() => {
        new Drift('.some-selector');
      }).toThrowError(TypeError, '`new Drift` requires a DOM element as its first argument.')
    });

    it('returns an instance of `Drift` when correctly instantiated', () => {
      let anchor = document.querySelector('.test-anchor');
      let drift = new Drift(anchor);

      expect(drift.constructor).toBe(Drift);
    });
  });

  describe('configuration', () => {
    it('sets up settings object when no options are passed', () => {
      let anchor = document.querySelector('.test-anchor');
      let drift = new Drift(anchor);

      expect(drift.settings).toBeDefined();
    });

    it('applies proper setting defaults when no options are passed', () => {
      let anchor = document.querySelector('.test-anchor');
      let drift = new Drift(anchor);

      expect(drift.settings).toEqual(defaultDriftConfig());
    });

    it('accepts custom settings', () => {
      let anchor = document.querySelector('.test-anchor');
      let drift = new Drift(anchor, {inlineOffsetX: 12});

      let expectedConfig = defaultDriftConfig();
      expectedConfig.inlineOffsetX = 12;

      expect(drift.settings).toEqual(expectedConfig);
    });

    it('requires `paneContainer` setting when `inlinePane !== true`', () => {
      let anchor = document.querySelector('.test-anchor');

      let conf = defaultDriftConfig();
      conf.paneContainer = null;

      expect(() => {
        new Drift(anchor, conf);
      }).toThrowError(TypeError, '`paneContainer` must be a DOM element when `inlinePane !== true`');
    });

    it('requires `paneContainer` to be a DOM element when `inlinePane !== true`', () => {
      let anchor = document.querySelector('.test-anchor');

      let conf = defaultDriftConfig();
      conf.paneContainer = '.not-a-dom-element';

      expect(() => {
        new Drift(anchor, conf);
      }).toThrowError(TypeError, '`paneContainer` must be a DOM element when `inlinePane !== true`');
    });

    it('allows `paneContainer` to be null when `inlinePane === true`', () => {
      let anchor = document.querySelector('.test-anchor');

      let conf = defaultDriftConfig();
      conf.paneContainer = null;
      conf.inlinePane = true;

      expect(() => {
        new Drift(anchor, conf);
      }).not.toThrow();
    });
  });

  describe('public methods', () => {
    describe('#setZoomImageURL', () => {
      it('updates the `src` attribute of the ZoomPane\'s `imgEl`', () => {
        let anchor = document.querySelector('.test-anchor');
        let drift = new Drift(anchor);

        drift.setZoomImageURL('test!');

        expect(drift.zoomPane.imgEl.getAttribute('src')).toBe('test!');
      });
    });

    describe('#enable', () => {
      it('sets `trigger.enabled` to `true`', () => {
        let anchor = document.querySelector('.test-anchor');
        let drift = new Drift(anchor);

        drift.trigger.enabled = false;

        drift.enable();

        expect(drift.trigger.enabled).toBe(true);
      });
    });

    describe('#disable', () => {
      it('sets `trigger.enabled` to `false`', () => {
        let anchor = document.querySelector('.test-anchor');
        let drift = new Drift(anchor);

        drift.disable();

        expect(drift.trigger.enabled).toBe(false);
      });
    });
  });
});
