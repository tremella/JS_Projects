
// ISSUE: we need to make a new instance of createAutoComplete for any new
// tests. Otherwise the tests will interfere with each other. beforeEach does this
// for us. We can use it to set up the environment, but also to clear it out
// before each setup.

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
// solution: DEBOUNCE

it('after searching, dropdown opens', () => {
    const input = document.querySelector('input');
    input.value = 'avengers';
    input.dispatchEvent(new Event('input'));
    const dropdown = document.querySelector('.dropdown')
    expect(dropdown.className).to.include('is-active');
})
