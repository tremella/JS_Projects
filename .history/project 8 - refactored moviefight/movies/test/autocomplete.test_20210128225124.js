it('shows an autocomplete', () => {
    createAutoComplete({
        root: document.querySelector('#target'),
        fetchData(){
            return[
                // our fake data.

            ]
        }
    })
});