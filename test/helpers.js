import ZoomPane from "../src/js/ZoomPane";

export const mockEvent = {
  preventDefault: function () {},
};

export function defaultDriftConfig() {
  return {
    namespace: null,
    showWhitespaceAtEdges: false,
    containInline: false,
    inlineOffsetX: 0,
    inlineOffsetY: 0,
    inlineContainer: document.body,
    sourceAttribute: "data-zoom",
    zoomFactor: 3,
    paneContainer: document.body,
    inlinePane: 375,
    handleTouch: true,
    onShow: null,
    onHide: null,
    injectBaseStyles: true,
    hoverDelay: 0,
    touchDelay: 0,
    hoverBoundingBox: false,
    touchBoundingBox: false,
    boundingBoxContainer: document.body,
    passive: false,
  };
}

export function zoomPaneOptions() {
  return {
    container: document.body,
    zoomFactor: 3,
    inline: 375,
    namespace: null,
    showWhitespaceAtEdges: false,
    containInline: false,
    inlineOffsetX: 0,
    inlineOffsetY: 0,
  };
}

export function triggerOptions() {
  return {
    el: document.querySelector(".test-anchor"),
    zoomPane: new ZoomPane(zoomPaneOptions()),
    sourceAttribute: "data-zoom",
    handleTouch: true,
    onShow: null,
    onHide: null,
    hoverDelay: 0,
    touchDelay: 0,
    hoverBoundingBox: false,
    touchBoundingBox: false,
    namespace: null,
    zoomFactor: 3,
    boundingBoxContainer: document.body,
    passive: false,
  };
}

export function boundingBoxOptions() {
  return {
    namespace: null,
    zoomFactor: 3,
    containerEl: document.querySelector(".test-anchor").offsetParent,
  };
}
