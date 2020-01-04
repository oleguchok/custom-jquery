export default function $(selector) {
  const addClass = function(className) {
    _getElement(selector)
      .classList.add(className);
    return this;
  }

  const removeClass = function(className) {
    _getElement(selector)
      .classList.remove(className);
    return this;
  }

  const _getElement = (selector) => document.querySelector(selector);

  return {
    addClass,
    removeClass
  }
}
