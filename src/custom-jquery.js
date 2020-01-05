import JQueryObject from './jQuery-object';
import { isString } from './helpers';

const $ = (selector) => {
  if (isString(selector)) {
    return new JQueryObject(document.querySelectorAll(selector));
  }
  return new JQueryObject([selector]);
}

export default $;
