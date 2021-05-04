const express = require('express');
const router = express.Router();
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');

// ROUTE HANDLERS
// also submission
// allow editing
// allowed submission of an editing form
// allow deletion

// route handler for product display
router.get('/admin/products', (req, res) => {});

// route handler for product creation
router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate)
});

module.exports(router);