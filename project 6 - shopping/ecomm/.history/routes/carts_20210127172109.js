// route handler for carts functionality
const express = require('express');
const cartsRepo = require('../carts')
const router = express.Router();



// routes we need:
// add item to cart, (POST)
router.post('/cart/products', async (req,res) => {
    //figure out cart: new or existing?
    console.log(req.body.productId);
    let cart;
    //increment quantity for existing item or add a new product to items array
    if (!req.session.cartId) { //cart id in cookie
        // we don't have a cart, we need to make one and store the cart ID on
        // our cookie
        const cart = await cartsRepo.create({items:[] });
        req.session.cartId = cart.id;
    } else {
        // we do have a cart! fetch.
        const cart = await cartsRepo.getOne(req.session.cartId)
    }


    res.send('product added to cart')
})

// display cart (GET)


// remove item from cart (POST)

module.exports = router;