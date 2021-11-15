const mongoose = require('mongoose')


const MedicineGenericSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const MedicineGeneric = mongoose.model('product_medicine_generic', MedicineGenericSchema)

module.exports = MedicineGeneric