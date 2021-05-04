const assert = require('assert')
it('has a text input', async () => {
    const dom = await render('index.html');// this object represents our html
    const input = dom.window.document.querySelector('input')
    assert(input);// will throw error if input is null
});