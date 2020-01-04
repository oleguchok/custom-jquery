export default class JQueryObject {
  constructor(selector) {
    this.elements = document.querySelectorAll(selector);
  }

  addClass(className) {
    this.elements
      .forEach(element => element.classList.add(className));
    return this;
  }

  removeClass(className) {
    this.elements
      .forEach(element => element.classList.remove(className));
    return this;
  }

  append(content) {
    if (content instanceof JQueryObject) {

    } else {

    }
  }
}
