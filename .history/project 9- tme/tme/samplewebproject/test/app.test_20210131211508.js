const assert = require('assert')

it('has a text input', async () => {
    const dom = await render('index.html');
    // this object represents our html
    const input = dom.window.document.querySelector('input')
    assert(input);// will throw error if input is null
});

it('shows a success message upon a valid email input', async () => {
    //renders the html again
    const dom = await render('index.html')
    const input = dom.window.document.querySelector('input');
    input.value = 'asdasdsad@gmail.com';
    //manual event dispatch
    dom.window.document
        .querySelector('form')
        .dispatchEvent(new dom.window.Event('submit')); //new submit event

    const h1 = dom.window.document.querySelector('h1')

})