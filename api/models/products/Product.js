const mongoose = require('mongoose')

const options = { discriminatorKey: 'kind' }

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
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
    //images: [String],

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
    image: { type: String },
    pack_size: { type: String },
    strip: { type: Number },
    box: { type: Number },
})

const config = require('config')
const GCS_BUCKET_NAME = config.get('GCS_BUCKET_NAME')
const STORAGE_BASE_URL = config.get('STORAGE_BASE_URL')

MedicineStrengthSchema.virtual('image_url').get(function () {
    if(!this.image){
        return undefined
    }
    return `${STORAGE_BASE_URL}${GCS_BUCKET_NAME}/${this.image}`
})

MedicineStrengthSchema.set('toObject', { virtuals: true })
MedicineStrengthSchema.set('toJSON', { virtuals: true })

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
    },
    medicine_types: [MedicineTypeSchema],
})

const MedicineSchema = mongoose.Schema({
    medicine_name: {
        type: String,
        unique: true,
    },
    genric_name: {
        type: String,
    },
    variations: [MedicineCompanyProductSchema],
  
    // provide (local or foreign) to field 'from'
    from: {
        type: String,
    },


    // 1. Ingredients
    // 2. Indication
    // 3. Usage
    // 4. Side effects
    // 5. Pregnancy and lactation
    // 6. Precautions

    ingredients: {
        type: String,
    },
    indication: {
        type: String,
    },
    usage: {
        type: String,
    },
    side_effects: {
        type: String,
    },
    preg_lac: {
        type: String,
    },
    precautions: {
        type: String,
    },
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
//const MedicineCompanyProduct = mongoose.model('med_comp_product', MedicineCompanyProductSchema);
//const MedicineType = mongoose.model('med_type', MedicineTypeSchema);
//const MedicineStrength = mongoose.model('med_strength', MedicineStrengthSchema);
//
const NormalProduct = Product.discriminator('normal', NormalSchema, options)

module.exports = {
    //Company,
    Product,
    EyeGlassProduct,
    MedicineProduct,
    // MedicineCompanyProduct, MedicineType, MedicineStrength,
    NormalProduct,
}