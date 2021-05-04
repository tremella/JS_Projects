// ISSUE: we need to make a new instance of createAutoComplete for any new
// tests. Otherwise the tests will interfere with each other. beforeEach does this
// for us. We can use it to set up the environment, but also to clear it out
// before each setup.

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

// this is where we setup/reset our autocomplete widget
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

it('dropdown starts closed', () => {
    const dropdown = document.querySelector('.dropdown')
    expect(dropdown.className).not.to.include('is-active'); // how very readable...
});

// we need to create a delay for this otherwise there's a bug:
// mainly, it expects delay and it isn't there.
// AssertionError: expected 'dropdown' to include 'is-active'

// solution...? we could wrap it in a setTimeout, but this is bad because if we
// update the delay elsewhere, the test will break.

// solution: a 'wait for' helper function

it('after searching, dropdown opens', async () => {
    const input = document.querySelector('input');
    input.value = 'avengers';
    input.dispatchEvent(new Event('input'));

    await waitFor('.dropdown-item'); // stop our test from running until element appears
    const dropdown = document.querySelector('.dropdown')
    expect(dropdown.className).to.include('is-active');
})

it('after searching, displays some results', async () => {
    const input = document.querySelector('input');
    input.value = 'avengers';

    input.dispatchEvent(new Event('input'));

    await waitFor('.dropdown-item');

    const items = document.querySelectorAll('.dropdown-item');

    expect(items.length).to.equal(4);

});