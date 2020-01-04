import $ from '../src/custom-jquery';

describe('custom-jquery tests', () => {
  test('should add class to element', () => {
    document.body.innerHTML = /* html */ `
      <div>
         <p class="base">Base paragraph</p>
      </div>`;

    $('.base').addClass('custom');

    const elem = document.querySelector('.base.custom');
    expect(elem).not.toBeNull();
  })

  test('should remove class from element', () => {
    document.body.innerHTML = /* html */ `
      <div>
         <p class="base">Base paragraph</p>
      </div>`;

    $('.base').removeClass('base');

    const elem = document.querySelector('.base');
    expect(elem).toBeNull();
  })

  test('should chain methods', () => {
    document.body.innerHTML = /* html */ `
      <div>
         <p class="base">Base paragraph</p>
      </div>`;

    $('.base')
      .addClass('custom')
      .removeClass('custom');

    const baseElem = document.querySelector('.base');
    const customElem = document.querySelector('.custom');
    expect(baseElem).not.toBeNull();
    expect(customElem).toBeNull();
  })
})
