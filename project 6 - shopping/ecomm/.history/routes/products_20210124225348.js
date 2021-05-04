// this holds route handlers related to products - but re: USER functionality

const express = require('express');
const productsRepo = require('../repositories/products')

const router = express.Router()// our router

//a handler to show our homepage
router.get('/', async (req,res) => {
    const products = await productsRepo.getAll()
    res.send('Products!') //the server request equivalent of hooking up a HTML to a JS file to see they work
});

module.exports = router;