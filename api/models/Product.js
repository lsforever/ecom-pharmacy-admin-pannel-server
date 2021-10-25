const mongoose = require('mongoose')

const options = { discriminatorKey: 'type' }

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    images: [String],
    brand: {
        type: String,
        required: true,
        default: "n/a"
    },
    description: {
        type: String,
        required: true,
        default: "n/a"
    }
},
    options
)

const EyeGlassSchema = mongoose.Schema({
    eyeglass: {
        type: String,
        required: true
    }
})

const MedicineSchema = mongoose.Schema({
    medicine: {
        type: String,
        required: true
    }
})



const Product = mongoose.model('product', ProductSchema)

const EyeGlassProduct = Product.discriminator('eye_glass', EyeGlassSchema, options);
const MedicineProduct = Product.discriminator('medicine', MedicineSchema, options);
const OtherProduct = Product.discriminator('other', MedicineSchema, options);

module.exports = { EyeGlassProduct ,MedicineProduct, OtherProduct}