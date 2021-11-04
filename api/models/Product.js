const mongoose = require('mongoose')

const options = { discriminatorKey: 'kind' }

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

    // This is just a markup price (In Strings not for use in transactions)
    price: {
        type: String,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'product_category'
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

    { ...options, timestamps: true }

)

const EyeGlassSchema = mongoose.Schema({
    eye_glass_type: {
        type: String
    }
})

const NormalSchema = mongoose.Schema({
    other: {
        type: String
    }
})
const MedicineSchema = mongoose.Schema({
    special_name: { type: String },
    strength: { type: String },
    medicine_type: [String],
    strip: { type: Number },
    box: { type: Number },
    company_name: [String],
    generic_name: [String]
})



const Product = mongoose.model('product', ProductSchema)

const EyeGlassProduct = Product.discriminator('eye_glass', EyeGlassSchema, options);
const MedicineProduct = Product.discriminator('medicine', MedicineSchema, options);
const NormalProduct = Product.discriminator('normal', NormalSchema, options);

module.exports = { Product, EyeGlassProduct, MedicineProduct, NormalProduct }