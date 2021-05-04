// this form will handle...

const {getError } = require('../../helpers');// tells user why things are broken
const layout = require('../layout')

module.exports = ({ product, errors }) => {
    return layout({
        content: `
        <form method="POST">
            <input name="title" value="${product.title}"/>
            ${getError(errors, 'title')}
            <input name="price" value="${product.price}"/>
            ${getError(errors, 'price')}
            <input name="image" type="file"/>

            <button>submit form</button>
        </form>
        `
    });
}