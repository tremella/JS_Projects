it('has a text input', async () => {
    const dom = await render('index.html');// this object represents our html
    console.log(dom)
    const input = dom.window.document.querySelector('input')
});