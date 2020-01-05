import { isString } from './helpers';

export default class JQueryObject {
  constructor(elements) {
    this.elements = [...elements];
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

  attr(attributeName, value = null) {
    if (value) {
      this.elements.forEach(element => element.setAttribute(attributeName, value));
      return this;
    } else {
      if (this.elements[0].hasAttribute(attributeName)) {
        return this.elements[0].getAttribute(attributeName);
      }
      return null;
    }
  }

  children(innerSelector = null) {
    const childrenElements = this.elements.reduce((acc, cur) => {
      return [...acc, ...Array.from(cur.children).filter(child => {
        if (innerSelector !== null) {
          return child.matches(innerSelector);
        }

        return true;
      })]
    },
    []);

    return new JQueryObject(childrenElements);
  }

  empty() {
    this.elements.forEach(element => {
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    })
    return this;
  }

  css(innerSelector, value = null) {
    if (value) {
      this.elements.forEach(element => { element.style[innerSelector] = value });
    } else {
      return this.elements.reduce(
        (acc, cur) => [...acc, cur.style[innerSelector]],
        []
      );
    }
    return this;
  }

  click(handler = null) {
    if (handler) {
      this.elements.forEach(element => element.addEventListener('click', handler));
    } else {
      this.elements.forEach(element => element.click());
    }
  }

  each(callback) {
    this.elements.forEach((element, index) => {
      callback.call(element, index);
    })

    return this;
  }

  toggle() {
    this.elements.forEach(element => {
      if (element.style.display === 'none') {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });

    return this;
  }
}
