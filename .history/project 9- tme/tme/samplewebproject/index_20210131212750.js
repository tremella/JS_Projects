document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();// don't submit form yet

    const { value } = document.querySelector('input'); //get the input value
    const header = document.querySelector('h1') //access the h1 to alert them re; valid/invalid email
    if (value.includes('@')) {
        //valid
        header.innerHTML = 'looks good'
    } else {
        //invalid
        header.innerHTML = 'invalid email!'
    }
});

window.stuffLoaded = true;