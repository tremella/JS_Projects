// this is our config object our basic way of making this code flexible, is
// that we took out a lot of its functionality, put it somewhere else, and fed
// them back into this as helper functions.
// movies will now be renamed to items (I think "content" is better)
const createAutoComplete = ({
    root,
    renderOption,
    onOptionSelect,
    inputValue,
    fetchData
}) => { //passing in helper functions to keep this code flexible
    root.innerHTML = `
        <label><b>Search</b></label>
        <input class = "input" />
        <div class="dropdown is-active">
          <div class="dropdown-menu"/>
            <div class="dropdown-content results" /></div>
          </div>
        </div>
    `;

    const input = root.querySelector('input'); // here's the HTML item of the input field
    const dropdown = root.querySelector('.dropdown'); // and of the dropdown option (it's a div)
    const resultsWrapper = root.querySelector('.results'); //and of the dropdown results

    const onInput = async event => { //fetching function now incorporates timeout
        //this is all where the autocomplete functionality is.
        const items = await fetchData(event.target.value); // this is secretly async and needs o be treated as such
        if (!items.length) {
            dropdown.classList.remove('is-active');
        }
        resultsWrapper.innerHTML = ''; //this simply clears the dropdown if, when and as we type until we stop.
        dropdown.classList.add('is-active');
        for (let item of items) { //this is where we build and access the results into clickable stuff
            const option = document.createElement('a'); // we make an actual page element per movie in search results
            //a=anchor tag
            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item); // rendering the view now in index.js
            option.addEventListener('click',() => {
                //update input text to match clicked result
                dropdown.classList.remove('is-active'); // closes dropdown
                input.value = inputValue(item);//closure scope: everything outside this arrow function. Allows us to reference item.Title
                //insert helper function here
                onOptionSelect(item);
                // helper function should handle what happens when user selects the movie they want
                // i.e. display things
                // this will go in utils.js
            })
            resultsWrapper.appendChild(option); //this is how we append the movie's box
        }
    };

    input.addEventListener('input', debounce(onInput, 400));
    document.addEventListener('click', event => {
        if (!root.contains(event.target)) { //if the target of our click event is NOT in root,
            //whatever
            dropdown.classList.remove('is-active');
        }
        // console.log(event.target); //will log whatever we click whenever we click
    }); //the config object is the argument
    //what's a config object? it's where we put the references to items, etc so
    //this function will be able to take in config objects, and those objects
    //could be for a movie, or a book, etc. It's how we manage flexibility.
    //It arranges the autocomplete to take in whatever context we're using it in.
};

