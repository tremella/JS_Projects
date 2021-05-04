it('shows an autocomplete', () => {
    createAutoComplete({
        root: document.querySelector('#target'),
        fetchData(){
            return[
                // our fake data object
                {
                    {Title: 'Avengers'},
                    {Title: 'Not Avengers'},
                    {Title: 'Avengers II: the Avengening'},
                }
            ]
        }
    })
});