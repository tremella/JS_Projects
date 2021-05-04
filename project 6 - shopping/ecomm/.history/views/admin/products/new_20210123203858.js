const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
    return layout({
      content: `
        <div class="columns is-centered">
          <div class="column is-half">
            <h1 class="subtitle">Create a Product</h1>
            
            <form method="POST" enctype="multipart/form-data">
              <div class="field">
                <label class="label">Title</label>
                <input class="input" placeholder="Title" name="title">
                <p class="help is-danger">${getError(errors, 'title')}</p>
              </div>

              <div class="field">
                <label class="label">Price</label>
                <input class="input" placeholder="Price" name="price">
                <p class="help is-danger">${getError(errors, 'price')}</p>
              </div>

              <div class="field">
                <label class="label">Image</label>
                <input type="file" name="image" />
              </div>
              <br />
              <button class="button is-primary">Create</button>
            </form>
          </div>
        </div>
      `
    });
  };

// enctype = encoding type. Its default is application/x-www-form-urlencoded
//form-urlencoded means "take the inputs out of the form, look at their name
//properties, and their values, and put them into a QUERY STRING format."

// ISSUE: some info cannot be transmitted into a URL-safe format (like a photo)
// so instead it just tells us the name and ignores the rest.

// SOLUTION multipart/form-data
//"take all the info from our form, send each one to backend server alone.."
{/* <form method="POST" enctype="multipart/form-data"> */}
