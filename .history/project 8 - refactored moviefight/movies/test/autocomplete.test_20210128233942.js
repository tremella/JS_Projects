
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

it('after searching, dropdown opens', () => {

})

// we can try make a fake input event - in console:
document.querySelector('input').value = 'avengers'
// "avengers"
// but the event watcher won't notice this. So if we want to trigger a search, we need to MANUALLY fake the event.
document.querySelector('input').dispatchEvent(new Event ('input'));