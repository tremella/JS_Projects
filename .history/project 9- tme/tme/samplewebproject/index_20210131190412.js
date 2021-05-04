document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();// don't submit form yet

    const { value } = document.querySelector('input'); //get the input value

    if (value.includes('@')) {
        //valid
    } else {
        //invalid
    }
})