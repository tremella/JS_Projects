// this holds route handlers related to products - but re: USER functionality

const express = require('express');

const router = express.Router()// our router

//a handler to show our homepage
router.get('/', async (req,res) => {
    res.send('Products!') //the equivalent of hooking up a HTML to a JS file to see they word
});

module.exports = router;