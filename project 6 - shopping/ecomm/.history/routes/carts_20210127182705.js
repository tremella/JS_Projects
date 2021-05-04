// route handler for carts functionality
const express = require('express');
const cartsRepo = require('../repositories/carts')
const router = express.Router();



// routes we need:
// add item to cart, (POST)
router.post('/cart/products', async (req,res) => {
    //figure out cart: new or existing?
    console.log(req.body.productId);
    let cart; // by putting it here, we can access it outside the fund
    //increment quantity for existing item or add a new product to items array
    if (!req.session.cartId) { //cart id in cookie
        // we don't have a cart, we need to make one and store the cart ID on
        // our cookie
        cart = await cartsRepo.create({ items : [] });
        req.session.cartId = cart.id;
    } else {
        // we do have a cart! fetch.
        cart = await cartsRepo.getOne(req.session.cartId)
    }

    const existingItem = cart.items.find(item => item.id === req.body.productId)
    // wtf is this syntax ^
    if (existingItem) {
        //increment qty and save cart
        existingItem.quantity++;
    } else {
        cart.items.push({id: req.body.productId, quantity : 1})
    }
    await cartsRepo.update(cart.id, {
        items: cart.items
        // make changes persist
    })
    res.send('product added to cart')
});

// display cart (GET)
router.get('/cart', (req,res) => {
    // if we don't have a cookie, don't go to cart page
    if (!req.session.cartId) {
        return res.redirect('/')
    }
    const cart = await cartsRepo.getOne(req.session.cartId)
});

// remove item from cart (POST)

module.exports = router;