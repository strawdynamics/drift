import ZoomPane from "../src/js/ZoomPane";

import { zoomPaneOptions } from "./helpers";

describe("ZoomPane", () => {
  it("returns an instance of `ZoomPane` when correctly instantiated", () => {
    const zoomPane = new ZoomPane(zoomPaneOptions());

    expect(zoomPane.constructor).toBe(ZoomPane);
  });

  it("requires `zoomFactor` option", () => {
    const opts = zoomPaneOptions();
    delete opts.zoomFactor;

    expect(() => {
      new ZoomPane(opts);
    }).toThrowError(Error, "Missing parameter");
  });

  it("requires `inline` option", () => {
    const opts = zoomPaneOptions();
    delete opts.inline;

    expect(() => {
      new ZoomPane(opts);
    }).toThrowError(Error, "Missing parameter");
  });

  it("requires `showWhitespaceAtEdges` option", () => {
    const opts = zoomPaneOptions();
    delete opts.showWhitespaceAtEdges;

    expect(() => {
      new ZoomPane(opts);
    }).toThrowError(Error, "Missing parameter");
  });

  it("requires `containInline` option", () => {
    const opts = zoomPaneOptions();
    delete opts.containInline;

    expect(() => {
      new ZoomPane(opts);
    }).toThrowError(Error, "Missing parameter");
  });

  it("builds its element", () => {
    const opts = zoomPaneOptions();
    opts.namespace = "tb";
    const zoomPane = new ZoomPane(opts);

    expect(zoomPane.el.classList.toString()).toBe("drift-zoom-pane tb-zoom-pane");
  });

  it("creates an `img` element inside its main element", () => {
    const zoomPane = new ZoomPane(zoomPaneOptions());

    expect(zoomPane.imgEl.parentElement).toBe(zoomPane.el);
  });

  it("sets the `imgEl` `src` attribute when `#show` is called", () => {
    const zoomPane = new ZoomPane(zoomPaneOptions());
    const testSrc = "http://assets.imgix.net/unsplash/pretty2.jpg";

    zoomPane.show(testSrc, 400);

    expect(zoomPane.imgEl.getAttribute("src")).toBe(testSrc);
  });

  it("sets the `imgEl` width attribute when `#show` is called", () => {
    const zoomPane = new ZoomPane(zoomPaneOptions());
    const testSrc = "http://assets.imgix.net/unsplash/pretty2.jpg";
    const triggerWidth = 400;

    zoomPane.show(testSrc, triggerWidth);

    expect(zoomPane.imgEl.style.width).toBe(`${triggerWidth * zoomPane.settings.zoomFactor}px`);
  });

  it("does not add the drift-loading class after first hover", () => {
    const zoomPane = new ZoomPane(zoomPaneOptions());
    const testSrc = "http://assets.imgix.net/unsplash/pretty2.jpg";
    const triggerWidth = 400;

    zoomPane.show(testSrc, triggerWidth);
    expect(zoomPane.el.classList.toString()).toContain("drift-loading");

    zoomPane.hide();
    setTimeout(function () {
      expect(zoomPane.el.classList.toString()).not.toContain("drift-loading");
    }, 1000);

    zoomPane.show(testSrc, triggerWidth);
    setTimeout(function () {
      expect(zoomPane.el.classList.toString()).not.toContain("drift-loading");
    }, 1000);
  });
});
