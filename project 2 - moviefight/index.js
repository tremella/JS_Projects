// to fix our code:
// 1) we'll have some non-reusable code which is specific to our project
// fetchData() > function to find movies
// renderOption() > function to display movie
// onOptionSelect() > function for when user clicks
// root > element that autocomplete renders into
//2) and then we'll put the autocomplete function into a different file and make it more agnostic to content.
//********************************************************
// GOAL 1: simply alter root so we can autocomplete more than once on the same page
//********************************************************
//this function handles requesting and returning the search data.

// autocomplete function was moved to autocomplete.js
// three invocations of the autocomplete field, tagged to three different HTML elements.
const autoCompleteConfig ={
    renderOption(movie) {
        // generate HTML per option
        const imgSRC = movie.Poster === 'N/A' ? '' : movie.Poster; //ternary expression to avoid blank poster errors
        return `
        <img src ="${imgSRC}"/>
        ${movie.Title} (${movie.Year})
    `
    },
    inputValue(movie) {
        // the goal is after a user clicks the option, we'll call this function
        // with the (movie) and, return whatever value should show up inside the
        // input.. so that it doesn't have the be hardcoded into autocomplete.js (??)
        //so we can call this function instead of referencing (movie.Title) in autocomplete.js
        return movie.Title;
    },
    async fetchData(searchTerm) { // a request is an async operation.
        // axios.get takes in a URL
        // await awaits the data INSIDE the response object.
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: 'a641f9d1', //apikey MUST be all lowercase
                s: searchTerm //s = movie title
                // this will be make into a string and appended on the URL
            }
        });
        if (response.data.Error) {
            return []; //"don't show results if our final search term is invalid"
        }
        return response.data.Search; //the meat of the response object
    },
};

//THIS IS MY CONFIG OBJECT
createAutoComplete({
    ...autoCompleteConfig, //for repeatability, as root is the only thing which isn't repeatable
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');//hides tute if you select an option
        //this class comes from the bulma css framework.
        onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
    }
});
createAutoComplete({
    ...autoCompleteConfig, //once more, call it! but for right.
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie, summary) {
        document.querySelector('.tutorial').classList.add('is-hidden');//hides tute if you select an option
        //this class comes from the bulma css framework.
        onMovieSelect(movie, document.querySelector('#right-summary'),'right');
    }
});
// creating these variables so we can compare movies later
let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, summaryElement, side) => { // I don't understand this syntax. >> movie is an argument that is passed in.
    const response = await axios.get('http://www.omdbapi.com/', { //<-- data req url here!
        params: {
            apikey: 'a641f9d1',
            i: movie.imdbID // lookup
        }
    });
    summaryElement.innerHTML = movieTemplate(response.data);
    if (side === 'left'){
        leftMovie = response.data;
        console.log(leftMovie.Title)
    } else {
        rightMovie = response.data;
        console.log(rightMovie.Title)
    };
    // do we have both sides selected? if so, compare
    if (leftMovie && rightMovie) {
        runComparison(); //helper function
    }
};

const runComparison = () => {
    console.log('comparison time!')
    const leftSideStats = document.querySelectorAll('#left-summary .notification');
    const rightSideStats = document.querySelectorAll('#right-summary .notification');

    leftSideStats.forEach((leftStat, index) => {
        const rightStat = rightSideStats[index];
        const leftSideValue = parseInt(leftStat.dataset.value);
        const rightSideValue = parseInt(rightStat.dataset.value);

        if (rightSideValue > leftSideValue) {
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-warning');
        } else {
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-warning');
        };
    }); // leftstat is an article element with a comparable movie Detail

};

const movieTemplate = (movieDetail) => { //movieDetail is an arg.
    // here is how we pass out data values so we can compare them easily, elsewhere
    const dollar = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')); // remove $ sign, commas, etc
    const metascore = parseInt(movieDetail.Metascore);
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g,''));
    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => { // split gives us an array.
        const value = parseInt(word); //if it's not a #, it'll return NaN
        if (isNaN(value)) {
            return prev; //if it's a word, stop
        } else {
            return prev + value;
        } //logic: just add up all awards and nominations
    }, 0);
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src= "${movieDetail.Poster}"/>
                </p>
            </figure>
            <div class="media-content>
                <div class="content">
                    <h1>${movieDetail.Title} </h1>
                    <h4>${movieDetail.Genre} </h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article data-value=${awards} class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value=${dollar} class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">BoxOffice</p>
        </article>
        <article data-value=${metascore} class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value=${imdbRating} class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article data-value=${imdbVotes} class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `
}