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
})
