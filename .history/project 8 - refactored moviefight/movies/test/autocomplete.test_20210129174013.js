// helper function to wait for the fake input event before launching a test.
const waitFor = (selector) => { // selector is what we wait for
    return new Promise((resolve, reject) => {
        const interval = setInterval(() => {
            if (document.querySelector(selector)) {
                clearInterval(interval); // vid 458, 4 minutes. IDGI.
                clearTimeout(timeout)   // vid 458, 4 minutes. IDGI.
                resolve();
            }
        }, 30); // check every 30ms to see if selector has appeared
        const timeout = setTimeout(() => { //runs once
            clearInterval(interval);    // vid 458, 4 minutes. IDGI.
            reject();
        }, 2000); // if after 2 seconds no action, exit.
    });
}

// helper function to clear widget and fetch fake data
beforeEach(() => {
    document.querySelector('#target').innerHTML = '';
    // manually clear out the widget from any previous tests
    createAutoComplete({
        root: document.querySelector('#target'),
        fetchData(){
            return[
                // our fake data
                    {Title: 'Avengers'},
                    {Title: 'Not Avengers'},
                    {Title: 'Avengers II: the Avengening'}
            ]
        },
        renderOption(movie) {
            return movie.Title;
        }
    })});


// TEST to ensure dropdown widget is closed when page first opens
it('dropdown starts closed', () => {
    const dropdown = document.querySelector('.dropdown')
    expect(dropdown.className).not.to.include('is-active'); // how very readable...
});


// TEST to make sure dropdown opens after a search
it('after searching, dropdown opens', async () => {
    const input = document.querySelector('input');
    input.value = 'avengers';
    input.dispatchEvent(new Event('input')); //fake input event launched

    await waitFor('.dropdown-item'); // stop our test from running until element appears

    const dropdown = document.querySelector('.dropdown')
    expect(dropdown.className).to.include('is-active');
})

// TEST to make sure results are displayed after searching
it('after searching, displays some results', async () => {
    const input = document.querySelector('input');
    input.value = 'avengers';
    input.dispatchEvent(new Event('input')); //fake input event launched

    await waitFor('.dropdown-item');// stop our test from running until element appears

    const items = document.querySelectorAll('.dropdown-item');
    expect(items.length).to.equal(3);

});