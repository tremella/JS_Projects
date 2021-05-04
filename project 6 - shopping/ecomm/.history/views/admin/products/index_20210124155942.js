// this is where we will define a template function for products
const layout = require('../layout')

module.exports = ({ products }) => {
    //for every product, make some HTML
    const renderedProducts = products.map((product) => {
        return `
        <div> ${product.title}</div>
        `
    }).join('');// join snippets into one string
    return layout({
        constent: `
        <h1 class="title">Products</h1>
        ${renderedProducts}
        `
    })
};