// secret message app
// encrypt a message into a URL and send it to someone
// then decrypt

href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"

// this is where we get a lot of our css styling and stuff to import
//e.g.
{/* <div class="col s8 offset-s2"> */}
// this will centre our screen

// the encryption is going to use  ASCII character code as well as BASE 64 ENCODING
// first we will convert to ASCII decimals,
// then to 8 digit binary,
// then concatenate all the digits together
// then split into 6-dgit binary (which is base 64 compatible)
// then map each group of 6 to base 64
// end result: an encrypted string


//ASCII: http://www.asciitable.com/
// a-z, A-Z, 0-9, "!@#$%^&*()" and others can be represented with a decimal value of 0 to 127
// 104 101 108 108 111 032 102 114 105 101 110 100
// "hello friend"

//BASE 64: https://www.garykessler.net/library/base64.html
// a-z, A-Z, 0-9 can be represented with a decimal value from 0 to 63
// aGVsbG8gZnJpZW5k

"A" = 0
"Z" = 25
"a" = 26
"z" = 51

// this will all be sped up for us: js already has a function for this
btoa('sec'); //"c2Vj"
atob('c2Vj') //"sec"

// message.com/index.html/?color=red#value
// message.com   /index.html/    ?color=red        #value
// domain       path              query string    hash/fragment
// query string communicates options to backend, like an options object

// the # hash is the bit we care about. That's where we store this - it's not
// relevant for the backend server.
// encoded string goes in the hash.

`${window.location}` //formats our web url as a convenient string
// "file:///C:/Users/Jess/JavaScript%20Tutes/js%20projects/project%204%20-%20secret%20message%20app/index.html?"

// we use NODE JS as well.