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

    expect(dropdown.className).not.to.include('is-active')

    // since we can't use assert (it's too nodey), we need another way of testing.
    // we can use an IF statement, but that's clumsy and duplicate-y
    // CHAI exists as a supplement to mocha. It can help us!
});