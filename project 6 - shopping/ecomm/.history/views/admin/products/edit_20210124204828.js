// this form will handle...

const layout = require('../layout')

module.exports = ({ product }) => {
    return layout({
        content: `
        <form method="POST">
            <input name="title" value="${product.title}"/>
            <input name="price" value="${product.price}"/>
        </form>
        `
    });
}