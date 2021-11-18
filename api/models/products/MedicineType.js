const mongoose = require('mongoose')


const MedicineTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    //Percentage of commission defined by admins for types.
    com: {
        type: Number,
    }
   
})

const MedicineType = mongoose.model('product_medicine_type', MedicineTypeSchema)

module.exports = MedicineType