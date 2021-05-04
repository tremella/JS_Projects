const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({errors}) => {
    return layout ({
        content: `
        <form method="POST" enctype="multipart/form-data">
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

// ISSUE: some info cannot be transmitted into a URL-safe format (like a photo)
// so instead it just tells us the name and ignores the rest.

// SOLUTION multipart/form-data
//"take all the info from our form, send each one to backend server alone.."
{/* <form method="POST" enctype="multipart/form-data"> */}
