const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({errors}) => {
    return layout ({
        content: `
        <form method="POST" enctype="">
        <input placeholder="Title" name="title" />
        <input placeholder="Price" name="price" />
        <input type="file"  name="image" />
        <button> Submit </button>
        </form>
        `
    })
};

// enctype = encoding type. Its default is application/x-www-form-urleconded
