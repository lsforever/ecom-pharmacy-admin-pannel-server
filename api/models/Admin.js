const mongoose = require('mongoose')
const roles = require('../utils/constants/roles')


const AdminSchema = mongoose.Schema({
    // Flag to check if the admin is accepted by owners
    flag: {
        type: String,
        required: true,
        default: false
    },

    // User ref if available
    user_ref: {
        type: String
    },

    // Name of the admin
    name: {
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

    profile_img: {
        type: String,
    },

    // NIC or Passport or Birth Certificate Images
    nic_or_other: {
        type: String,
    },

    birthday: {
        type: Date,
    }
    
},
    { timestamps: true }
)


const Admin = mongoose.model(roles.admin, AdminSchema)

module.exports = Admin