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

  test('should remove element', () => {
    document.body.innerHTML = /* html */ `
    <div class="container">
      <div class="hello">Hello</div>
      <div class="goodbye">Goodbye</div>
    </div>`;

    $('.hello').remove();

    const elements = document.querySelectorAll('.hello');
    expect(elements).toHaveLength(0);
  })

  test('should remove element by selector', () => {
    document.body.innerHTML = /* html */ `
    <div class="container">
      <div class="hello">Hello</div>
      <div class="goodbye">Goodbye</div>
    </div>
    <div class="hello">Hello</div>`;

    $('.container').remove('.hello');

    const helloElements = document.querySelectorAll('.hello');
    expect(helloElements).toHaveLength(1);

    const containerHelloElements = document.querySelectorAll('.container > .hello');
    expect(containerHelloElements).toHaveLength(0);
  })

  test('should get the combined text contents of each element by selector, including their descedants', () => {
    document.body.innerHTML = /* html */ `
    <div class="demo-container"
      ><div class="demo-box">Demonstration Box</div
      ><ul
        > <li>list item 1</li
        > <li>list <strong>item</strong> 2</li
      ></ul
    ></div>`;

    const containerText = $('div.demo-container').text();
    expect(containerText).toBe('Demonstration Box list item 1 list item 2');
  })

  test('should get attribute value', () => {
    document.body.innerHTML = /* html */ `
    <div class="container">
     <input id="test" type="text"></input>
    </div>`;

    const value = $('#test').attr('type');

    expect(value).toBe('text');
  })

  test('should get null if attribute value doesnot exist', () => {
    document.body.innerHTML = /* html */ `
    <div class="container">
     <input id="test" type="text"></input>
    </div>`;

    const value = $('#test').attr('nonono');

    expect(value).toBeNull();
  })

  test('should set attribute value', () => {
    document.body.innerHTML = /* html */ `
    <div class="container">
     <input id="test" type="text"></input>
    </div>`;

    $('#test').attr('type', 'password');

    const element = document.querySelector('#test').getAttribute('type');

    expect(element).toBe('password');
  })

  test('should return jquery object with all first-level children', () => {
    document.body.innerHTML = /* html */ `
    <ul class="level-1">
      <li class="item-i">I</li>
      <li class="item-ii">II
        <ul class="level-2">
          <li class="item-1">1</li>
          <li class="item-2">2
            <ul class="level-3">
              <li class="item-a">A</li>
              <li class="item-b">B</li>
            </ul>
          </li>
          <li class="item-3">3</li>
        </ul>
      </li>
      <li class="item-iii">III</li>
    </ul>`;

    const children = $('ul.level-2').children();
    children.elements.forEach(
      (element, index) =>
        expect(element.getAttribute('class')).toEqual(`item-${index + 1}`)
    );
  })

  test('should return jquery object with first-level children filtered by selector', () => {
    document.body.innerHTML = /* html */ `
    <ul class="level-1">
      <li class="item-i">I</li>
      <li class="item-ii">II
        <ul class="level-2">
          <li class="item-1">1</li>
          <li class="item-2">2
            <ul class="level-3">
              <li class="item-a">A</li>
              <li class="item-b">B</li>
            </ul>
          </li>
          <li class="item-3">3</li>
        </ul>
      </li>
      <li class="item-iii">III</li>
    </ul>`;

    const children = $('ul.level-2').children('.item-2');

    children.elements.forEach(
      (element) => expect(element.getAttribute('class')).toEqual('item-2'));
  })

  test('should remove all child nodes', () => {
    document.body.innerHTML = /* html */ `
    <div class="container"
      ><div class="hello">Hello<p>world</p></div
      ><div class="goodbye">Goodbye</div
    ></div>`;

    $('.hello').empty();
    expect(document.querySelector('.hello').children).toHaveLength(0);
  })

  test('should get css prop', () => {
    document.body.innerHTML = /* html */ `
    <div class="container" style="color: red"
      ><div class="hello">Hello<p>world</p></div
      ><div class="goodbye">Goodbye</div
    ></div>`;

    const colors = $('.container').css('color');
    expect(colors).toHaveLength(1);
    expect(colors[0]).toEqual('red');
  })

  test('should set css prop', () => {
    document.body.innerHTML = /* html */ `
    <div class="container" style="color: red"
      ><div class="hello">Hello<p>world</p></div
      ><div class="goodbye">Goodbye</div
    ></div>`;

    $('.container').css('color', 'blue');

    const colors = Array.from(document.querySelectorAll('.container')).map(e => e.style.color);
    expect(colors).toHaveLength(1);
    expect(colors[0]).toEqual('blue');
  })

  test('should set handler on click', () => {
    document.body.innerHTML = /* html */ `
    <div class="container" style="color: red"
      ><div class="hello">Hello<p>world</p></div
      ><div class="goodbye">Goodbye</div
    ></div>`;

    $('.container').click(function() {
      document.querySelector('.hello').classList.add('clicked');
    });

    $('.container').click();

    expect(document.querySelector('.hello.clicked')).not.toBeNull();
  })

  test('should change each odd elements', () => {
    document.body.innerHTML = /* html */ `
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>`;

    $('li').each(function(index) {
      if (index % 2) {
        $(this).addClass('odd');
      }
    });

    expect(document.querySelectorAll('li.odd')).toHaveLength(2);
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
