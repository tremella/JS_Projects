// route handler for carts functionality
const express = require('express');

const router = express.Router();



// routes we need:
// add item to cart, (POST)
router.post('/cart/products', (req,res) => {
    //figure out cart: new or existing?
    console.log(req.body.productId);

    //increment quantity for existing item or add a new product to items array
    if (!req.session.cartId) { //cart id in cookie
        // we don't have a cart, we need to make one and store the cart ID on our cookie
    } else {
        // we do have a cart! fetch.
    }


    res.send('product added to cart')
})

// display cart (GET)


// remove item from cart (POST)

module.exports = router;