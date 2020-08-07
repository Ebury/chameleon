export function setUpHTMLElement(options) {
  Object.defineProperties(global.HTMLElement.prototype, {
    offsetTop: {
      get() { return (options && options.offsetTop) || 0; },
    },
    offsetHeight: {
      get() { return (options && options.offsetHeight) || 50; },
    },
    clientHeight: {
      get() { return (options && options.clientHeight) || 200; },
    },
  });
}
