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
      const elementsToInsert = content.elements;
      this.elements
        .forEach((target, index, targets) =>
          elementsToInsert.forEach(toInsert => {
            index + 1 === targets.length
              ? target.append(toInsert)
              : target.append(toInsert.cloneNode(true))
          })
        );
    } else {
      this.elements
        .forEach(element => element.insertAdjacentHTML('beforeend', content));
    }

    return this;
  }
}
