export default class JQueryObject {
  constructor(selector) {
    this.elements = [...document.querySelectorAll(selector)];
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
    this.elements
      .forEach((target, index, targets) => {
        if (content instanceof JQueryObject) {
          const elementsToInsert = (index + 1 === targets.length)
            ? content.elements
            : content.elements.map(e => e.cloneNode(true));
          elementsToInsert.forEach(toInsert => target.append(toInsert));
        } else {
          target.insertAdjacentHTML('beforeend', content);
        }
      });

    return this;
  }

  remove(innerSelector) {
    this.elements = this.elements.filter(element => {
      if (isString(innerSelector) && !element.querySelector(innerSelector)) {
        return true;
      } else {
        element.remove();
        return false;
      }
    });

    return this;
  }

  text() {
    return this.elements.reduce((acc, cur) => {
      if (acc === '') {
        return cur.textContent.trim();
      }
      return `${acc} ${cur.textContent.trim()}`;
    }, '');
  }
}

const isString = (value) => typeof value === 'string';
