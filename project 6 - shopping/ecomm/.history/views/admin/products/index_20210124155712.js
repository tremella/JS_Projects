// this is where we will define a template function for products
const layout = require('../layout')

module.exports = ({ products }) => {
    return layout({
        constent: `
        <h1 class="title">Products</h1>
        `
    })
};