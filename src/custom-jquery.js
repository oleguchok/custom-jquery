import JQueryObject from './jQuery-object';

const $ = (selector) => new JQueryObject(document.querySelectorAll(selector));

export default $;
