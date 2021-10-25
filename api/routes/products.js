const express = require('express')
const router = express.Router()

const {MedicineProduct,EyeGlassProduct, OtherProduct} = require('../models/Product');

// @route       GET api/products
// @desc        get all products
// @access      Private
router.get('/', (req, res) => {
    res.send('get all products')
})

// @route       POST api/products
// @desc        add new product
// @access      Private
router.post('/',async (req, res) => {
    res.send('add product')
    
    // const { name, category, price } = req.body
    // if(category=== "a"){
    //     const eyeglass = req.body.eyeglass
    //     let eyeGlass_obj = new EyeGlass({
    //         name,
    //         category,
    //         price,
    //         eyeglass
    //     })
    //     await eyeGlass_obj.save()
    //     res.status(200).json({ msg: 'done' })
    // }else if(category=== "b"){
    //     const medicine= req.body.medicine
    //     let medicine_obj = new Medicine({
    //         name,
    //         category,
    //         price,
    //         medicine
    //     })
    //     await medicine_obj.save()
    //     res.status(200).json({ msg: 'done' })
    // }else{
    //     let product  = new Product({
    //         name,
    //         category,
    //         price
    //     })

    //     await product.save()
    //     res.status(200).json({ msg: 'done' })
    // }
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