import $ from '../src/custom-jquery';

describe('custom-jquery tests', () => {
  test('should add class to elements', () => {
    document.body.innerHTML = /* html */ `
      <div>
         <p class="base">First base paragraph</p>
         <p class="base">Second base paragraph</p>
      </div>`;

    $('.base').addClass('custom');

    const paragraphs = document.querySelectorAll('.base.custom');
    expect(paragraphs).toHaveLength(2);
  })

  test('should append string content to all elements', () => {
    document.body.innerHTML = /* html */ `
      <h2>Greetings</h2>
      <div class="container">
        <div class="inner">Hello</div>
        <div class="inner">Goodbye</div>
      </div>
    `;

    const testParagraph = '<p>Test</p>';
    $('.inner').append(testParagraph);

    const elements = document.querySelectorAll('.inner > p');
    expect(elements).toHaveLength(2);
    expect(document.body.innerHTML).toEqual(/* html */ `
      <h2>Greetings</h2>
      <div class="container">
        <div class="inner">Hello${testParagraph}</div>
        <div class="inner">Goodbye${testParagraph}</div>
      </div>
    `);
  })

  test('should append jquery object content to all elements', () => {
    document.body.innerHTML = /* html */ `
      <h2>Greetings</h2>
      <div class="container">
        <div class="inner">Hello</div>
        <div class="inner">Goodbye</div>
      </div>
      <div class="container"></div>
    `;

    $('.container').append($('h2'));

    expect(document.body.innerHTML).toEqual(/* html */ `
      
      <div class="container">
        <div class="inner">Hello</div>
        <div class="inner">Goodbye</div>
      <h2>Greetings</h2></div>
      <div class="container"><h2>Greetings</h2></div>
    `);
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
