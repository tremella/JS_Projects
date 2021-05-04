it('shows an autocomplete', () => {
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
    })
    const dropdown = document.querySelector('.dropdown')

    expect(dropdown.className).not.to.include('is-active'); // how very readable...


});

// ISSUE: we need to make a new instance of createAutoComplete. 
// beforeEach does this for us.
it('after searching, dropdown opens up!' () => {

})