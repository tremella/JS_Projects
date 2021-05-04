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

it('shows an autocomplete', () => {
    const dropdown = document.querySelector('.dropdown')

    expect(dropdown.className).not.to.include('is-active'); // how very readable...


});

// ISSUE: we need to make a new instance of createAutoComplete. 
// beforeEach does this for us.
it('after searching, dropdown opens up!' () => {

})