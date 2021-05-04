const express = require('express');
const { validationResult } = require('express-validator')
const router = express.Router();
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

// ROUTE HANDLERS
// also submission
// allow editing
// allowed submission of an editing form
// allow deletion

// route handler for product display
router.get('/admin/products', (req, res) => {});

// route handler for product creation
router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate({}));
});

router.post('/admin/products/new', [requireTitle, requirePrice], (req,res) =>{
    const errors = validationResult(req);
    console.log(req.body)
    res.send('submitted');
})

module.exports = router;