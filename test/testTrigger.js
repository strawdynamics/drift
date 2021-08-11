import Trigger from "../src/js/Trigger";

import { mockEvent, triggerOptions } from "./helpers";

beforeEach(function () {
  const anchor = document.createElement("a");
  anchor.classList.add("test-anchor");
  anchor.setAttribute("href", "http://assets.imgix.net/test.png&w=400");
  anchor.dataset.zoom = "http://assets.imgix.net/test.png&w=1200";
  document.body.appendChild(anchor);
});

afterEach(function () {
  const anchor = document.querySelector(".test-anchor");

  document.body.removeChild(anchor);
});

describe("Trigger", () => {
  it("returns an instance of `Trigger` when correctly instantiated", () => {
    const trigger = new Trigger(triggerOptions());

    expect(trigger.constructor).toBe(Trigger);
  });

  it("requires `el` option", () => {
    const opts = triggerOptions();
    delete opts.el;

    expect(() => {
      new Trigger(opts);
    }).toThrowError(Error, "Missing parameter");
  });

  it("requires `zoomPane` option", () => {
    const opts = triggerOptions();
    delete opts.zoomPane;

    expect(() => {
      new Trigger(opts);
    }).toThrowError(Error, "Missing parameter");
  });

  it("requires `sourceAttribute` option", () => {
    const opts = triggerOptions();
    delete opts.sourceAttribute;

    expect(() => {
      new Trigger(opts);
    }).toThrowError(Error, "Missing parameter");
  });

  it("requires `handleTouch` option", () => {
    const opts = triggerOptions();
    delete opts.handleTouch;

    expect(() => {
      new Trigger(opts);
    }).toThrowError(Error, "Missing parameter");
  });

  it("executes the `onShow` callback when present", () => {
    let called = false;
    // e
    function showCallback() {
      called = true;
    }
    const opts = triggerOptions();
    opts.onShow = showCallback;

    const trigger = new Trigger(opts);
    trigger._show(mockEvent);

    expect(called).toBe(true);
  });

  it("executes the `onHide` callback when present", () => {
    let called = false;
    function hideCallback() {
      called = true;
    }

    const opts = triggerOptions();
    opts.onHide = hideCallback;

    const trigger = new Trigger(opts);
    trigger._show(mockEvent);
    trigger._hide(mockEvent);

    expect(called).toBe(true);
  });

  it("executes touchstart on mobile when handleTouch is set to true", () => {
    const opts = triggerOptions();
    opts.handleTouch = true;
    const spy = spyOn(Trigger.prototype, "_handleEntry");
    const trigger = new Trigger(opts);

    const event = new Event("touchstart");

    trigger.settings.el.dispatchEvent(event);
    expect(spy).toHaveBeenCalled();
  });

  it("does not execute touchstart on mobile when handleTouch is set to false", () => {
    const opts = triggerOptions();
    opts.handleTouch = false;
    const spy = spyOn(Trigger.prototype, "_handleEntry");
    const trigger = new Trigger(opts);

    const event = new Event("touchstart");

    trigger.settings.el.dispatchEvent(event);
    expect(spy).not.toHaveBeenCalled();
  });

  it("uses passive listeners for touchstart on mobile when passive is set to true", () => {
    const opts = triggerOptions();
    opts.passive = true;

    const trigger = new Trigger(opts);

    const event = new Event("touchstart", { cancelable: true });

    trigger.settings.el.dispatchEvent(event);
    expect(event.defaultPrevented).toBeFalse();
  });

  it("does not use passive listeners for touchstart on mobile when passive is set to false", () => {
    const opts = triggerOptions();
    opts.passive = false;

    const trigger = new Trigger(opts);
    const event = new Event("touchstart", { cancelable: true });

    trigger.settings.el.dispatchEvent(event);
    expect(event.defaultPrevented).toBeTrue();
  });
});
