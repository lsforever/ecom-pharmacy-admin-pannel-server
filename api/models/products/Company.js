const mongoose = require('mongoose')


const CompanySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
  
   
})

const Company = mongoose.model('company', CompanySchema)

module.exports = Company