// this holds route handlers related to products - but re: USER functionality

const express = require('express');
const productsRepo = require('../repositories/products')
const productsIndexTemplate = require('../views/products/index')

const router = express.Router()// our router

//a handler to show our homepage
router.get('/', async (req,res) => {
    const products = await productsRepo.getAll(); //shows all products
});

module.exports = router;