import Drift from '../src/js/Drift';

describe('Core', () => {
  it('exposes `Drift` on `window`', () => {
    expect(window.Drift).toBeDefined();
  });

  xit('throws if no arguments are passed', () => {

  });

  xit('returns an instance of `Drift` when correctly instantiated', () => {

  });

  xit('executes the `onShow` callback when present', () => {
    let called = false;
    function showCallback() {
      called = true;
    }

    expect(called).toBe(true);
  });

  xit('executes the `onHide` callback when present', () => {
    let called = false;
    function hideCallback() {
      called = true;
    }

    expect(called).toBe(true);
  });
});

describe('Configuration', () => {
  xit('sets up settings object when no options are passed', () => {
    let drift = new Drift;

    expect(drift.settings).toBeDefined();
  });

  xit('applies proper setting defaults when no options are passed', () => {
    let drift = new Drift;

    expect(drift.settings.something).toBe('x');
  });

  xit('accepts custom settings', () => {
    let drift = new Drift({something: 'y'});

    expect(lum.settings.something).toBe('y');
  });

  xit('leaves settings defaults in place when custom settings are passed', () => {
    let drift = new Drift(anchor, {lorem: 'ipsum'});

    expect(lum.settings.something).toBe('x');
  });
});
