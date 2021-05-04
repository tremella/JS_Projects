const express = require('express');
const { validationResult } = require('express-validator')
const multer = require('multer');

const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');
const { handleErrors } = require('./middlewares')

const router = express.Router();
const upload = multer({storage : multer.memoryStorage()})
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

//apparently putting our middleware before the requireTitle requirePrice args averted a bug related to multer
router.post(
    '/admin/products/new',
    upload.single('image'),
    [requireTitle, requirePrice],
    handleErrors(productsNewTemplate),
    async (req,res) =>{
        //don't want immediate invocation
        //storing img as string
        const image = req.file.buffer.toString('base64');
        const { title, price } = req.body;
        await productsRepo.create({title, price, image});
        res.send('submitted');
    }
);

module.exports = router;