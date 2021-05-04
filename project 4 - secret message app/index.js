// we extract the hash from the URL, if it exists (e.g. if we're receiving a
// message) then we convert the hash (minus the #) from base 64 to text, using
// ATOB. this is our message! So, if one exists, we hide the message form and
// replace it with the received message div.

//THEN we set the HTML in the link to be ./index.html, so we remove the hash in the URL.
const { hash } = window.location;
const message = atob(hash.replace('#',''));

if (message) {
    document.querySelector('#message-form').classList.add('hide');
    document.querySelector('#message-show').classList.remove('hide');

    document.querySelector('h1').innerHTML = message;
}

document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault(); //prevent submission and wiping of input

    document.querySelector('#message-form').classList.add('hide');
    document.querySelector('#link-form').classList.remove('hide'); //toggle visibility

    const input = document.querySelector('#message-input');
    const encoded = btoa(input.value); //enter here to encode

    //copy/paste from here to share encoded string
    const linkInput = document.querySelector('#link-input');
    linkInput.value = `${window.location}#${encoded}`;
    linkInput.select();//autoselects for the user
});

//note: at present, only available on our local machine.
//file:///C:/Users/Jess/JavaScript%20Tutes/js%20projects/project%204%20-%20secret%20message%20app/index.html?#YXBwbGVz
//atob('YXBwbGVz') //apples

// to get the # string at the end of the URL once recipient uses the link:
window.location.hash
// "#bGlua3k="

