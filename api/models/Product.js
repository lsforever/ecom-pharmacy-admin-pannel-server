const mongoose = require('mongoose')

const options = { discriminatorKey: 'type' }

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    // This checks the product is accepted by admins
    flag: {
        type: Boolean,
        required: true,
        default: false
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
    eye_glass_type: {
        type: String
    }
})

const MedicineSchema = mongoose.Schema({
    special_name: { type: String },
    strength: { type: String },
    medicine_type:[String],
    strip:{ type: Number },
    box:{ type: Number },
    company_name: [String],
    generic_name:[String]
})



const Product = mongoose.model('product', ProductSchema)

const EyeGlassProduct = Product.discriminator('eye_glass', EyeGlassSchema, options);
const MedicineProduct = Product.discriminator('medicine', MedicineSchema, options);
const OtherProduct = Product.discriminator('other', MedicineSchema, options);

module.exports = { EyeGlassProduct, MedicineProduct, OtherProduct }