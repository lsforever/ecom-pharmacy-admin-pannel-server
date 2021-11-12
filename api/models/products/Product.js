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

    description: {
        type: String,
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


//////////////////////////////////////////
//////////////////////////////////////////

const MedicineStrengthSchema = mongoose.Schema({
    strength_name: { type: String },
    picture: { type: String },
    pack_size: { type: String },
    strip: { type: Number },
    box: { type: Number },
})

const MedicineTypeSchema = mongoose.Schema({
    type_name: { type: String },
    strengths: [MedicineStrengthSchema]
})

const MedicineCompanyProductSchema = mongoose.Schema({
    // company: { 
    //     type: mongoose.Types.ObjectId,
    //     ref: 'company',
    //     unique: true
    // },
    company_name: { 
        type: String,
        unique: true
    },
    medicine_types: [MedicineTypeSchema],
})

const MedicineSchema = mongoose.Schema({
    medicine_name: {
        type: String,
        unique: true
    },
    genric_name: {
        type: String,
        unique: true
    },
    variations: [MedicineCompanyProductSchema],
    // TODO local foreign and other 6 local field descriptions
})

//////////////////////////////////////////
//////////////////////////////////////////








// const CompanySchema = mongoose.Schema({
//     company_name: { type: String },
// })

//const Company = mongoose.model('company', CompanySchema)
const Product = mongoose.model('product', ProductSchema)

// below is the dicriminators of products
//
const EyeGlassProduct = Product.discriminator('eye_glass', EyeGlassSchema, options)
//
const MedicineProduct = Product.discriminator('medicine', MedicineSchema, options)
const MedicineCompanyProduct = mongoose.model('med_comp_product', MedicineCompanyProductSchema);
const MedicineType = mongoose.model('med_type', MedicineTypeSchema);
const MedicineStrength = mongoose.model('med_strength', MedicineStrengthSchema);
//
const NormalProduct = Product.discriminator('normal', NormalSchema, options)

module.exports = {
    //Company,
    Product,
    EyeGlassProduct, 
    MedicineProduct, MedicineCompanyProduct,MedicineType,MedicineStrength,
    NormalProduct,
}