// this is where we will define a template function for products
const layout = require('../layout')

module.exports = ({ products }) => {
    //for every product, make some HTML
    
    //Then make it one string and show it all
    return layout({
        constent: `
        <h1 class="title">Products</h1>
        `
    })
};