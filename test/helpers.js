import ZoomPane from '../src/js/ZoomPane';

export let mockEvent = {
  preventDefault: function() {}
};

export function defaultDriftConfig() {
  return {
    namespace: null,
    showWhitespaceAtEdges: false,
    containInline: false,
    inlineOffsetX: 0,
    inlineOffsetY: 0,
    sourceAttribute: 'data-zoom',
    zoomFactor: 3,
    paneContainer: document.body,
    inlinePane: 375,
    handleTouch: true,
    onShow: null,
    onHide: null,
    injectBaseStyles: true,
    hoverDelay: 0,
    touchDelay: 0,
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
    el: document.querySelector('.test-anchor'),
    zoomPane: new ZoomPane(zoomPaneOptions()),
    sourceAttribute: 'data-zoom',
    handleTouch: true,
    onShow: null,
    onHide: null,
    hoverDelay: 0,
    touchDelay: 0,
  };
}
