export default function $(selector) {
  const addClass = (className) => {
    document
      .querySelector(selector)
      .classList.add(className);
  }

  return {
    addClass
  }
}
