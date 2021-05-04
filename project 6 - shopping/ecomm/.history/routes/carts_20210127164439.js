// route handler for carts functionality
const express = require('express');

const router = express.Router();

module.exports = router;

// routes we need:
// add item to cart, (POST)
// display cart (GET)
// remove item from cart (POST)

// here is the page element: the FORM action will post to /cart/products
<footer class="card-footer">
              <form action="/cart/products" method="POST">
                <button class="button has-icon is-inverted">
                  <i class="fa fa-shopping-cart"></i> Add to cart
                </button>
              </form>
            </footer>