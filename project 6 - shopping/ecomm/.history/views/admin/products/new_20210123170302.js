const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({errors}) => {
    return layout ({
        content: `
        <form method="POST" enctype="application/x-www-form-urlencoded">
        <input placeholder="Title" name="title" />
        <input placeholder="Price" name="price" />
        <input type="file"  name="image" />
        <button> Submit </button>
        </form>
        `
    })
};

// enctype = encoding type. Its default is application/x-www-form-urlencoded
//form-urlencoded means "take the inputs out of the form, look at their name
//properties, and their values, and put them into a QUERY STRING format."
