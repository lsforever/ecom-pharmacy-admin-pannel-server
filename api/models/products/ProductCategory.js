const mongoose = require('mongoose')


const ProductCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
  
   
})

const ProductCategory = mongoose.model('product_category', ProductCategorySchema)

module.exports = ProductCategory