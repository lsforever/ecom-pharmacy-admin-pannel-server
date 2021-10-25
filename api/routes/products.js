const express = require('express')
const router = express.Router()

// @route       GET api/products
// @desc        get all products
// @access      Private
router.get('/', (req, res) => {
    res.send('get all products')
})

// @route       POST api/products
// @desc        add new product
// @access      Private
router.post('/', (req, res) => {
    res.send('add product')
})

// @route       PUT api/products
// @desc        update a product
// @access      Private
router.put('/:id', (req, res) => {
    res.send('update product')
})

// @route       DELETE api/products
// @desc        delete a product
// @access      Private
router.delete('/', (req, res) => {
    res.send('delete product')
})


module.exports = router