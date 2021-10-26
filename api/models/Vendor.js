const mongoose = require('mongoose')


const PriceSchema = mongoose.Schema({
    major: {
        type: Number,
        required: true,
        default: 0
    },
    minor: {
        type: Number,
        required: true,
        default: 0
    },
    currency: {
        type: String,
        default: 'BDT'
    }
})

const VendorProductSchema = mongoose.Schema({
    price: PriceSchema,
    availability: {
        type: Boolean,
        default: false
    },
    stock: {
        type: Number,
        default: 0
    }
})


const VendorSchema = mongoose.Schema({
    // Flag to check if the vendor is accepted by admins
    flag: {
        type: String,
        required: true,
        default: false
    },

    // Name of the shop of vendor
    name: {
        type: String,
        required: true,
    },
    // Type of the shop
    type: {
        type: String,
        required: true,
    },

    // Address
    address: {
        type: String,
        required: true,
    },

    // List of contact numbers
    contact: [String],

    location: {
        type: { type: String },
        coordinates: [Number],
    },

    owner_img: {
        type: String,
    },

    drug_license: {
        type: String,
    },

    trade_license: {
        type: String,
    },

    products: [VendorProductSchema]
},
    { timestamps: true }
)

VendorSchema.index({ location: "2dsphere" });


const Vendor = mongoose.model('vendors', VendorSchema)

const VendorProduct = mongoose.model('vendor_products', VendorProductSchema)

const Price = mongoose.model('price', PriceSchema)

module.exports = { Vendor, VendorProduct, Price }