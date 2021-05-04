// route handler for carts functionality
const express = require('express');

const router = express.Router();

module.exports = router;

// routes we need:
// add item to cart, (POST)
router.post('/cart/products', (req,res) => {
    console.log(req.body.productId);
    res.send('product added to cart')
})

// display cart (GET)


// remove item from cart (POST)
