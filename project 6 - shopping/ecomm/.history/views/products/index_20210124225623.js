//this is from a user perspective, not an admin one.
module.exports = ({ products }) => {
    //for each product, give some info
    const renderedProducts = products.map(product => {
        return `
        <li>${product.title} - ${product.price}</li>
        `;
    })
}