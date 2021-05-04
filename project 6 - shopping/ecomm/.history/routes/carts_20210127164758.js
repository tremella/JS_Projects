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
// WAYS WE COULD HANDLE ADDING A PRODUCT TO A CART:
//to put it in the cart, we could use /cart/products/${product.id} OR we could

// hide an INPUT element with a product.id link, and it'll get checked upon
// clicking, and placed in the POST request