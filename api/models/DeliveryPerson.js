const mongoose = require('mongoose')
const roles = require('../utils/constants/roles')



// const DeliverySchema = mongoose.Schema({
//     order_ref: {
//         type: String
//     }
// },
//     { timestamps: true }
// )


const DeliverPersonSchema = mongoose.Schema({
    // Flag to check if the vendor is accepted by admins
    flag: {
        type: String,
        required: true,
        default: false
    },

    // User ref if available
    user_ref: {
        type: String
    },

    // Name of the deliver person
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

    // Profile image link of delivery person
    profile_img: {
        type: String,
    },

    // NIC or Passport or Birth Certificate Images
    nic_or_other: {
        type: String,
    },

    birthday: {
        type: Date,
    },

    deliveries: [VendorProductSchema]
},
    { timestamps: true }
)



const DeliverPerson = mongoose.model(roles.delivery_person, DeliverPersonSchema)

//const Delivery = mongoose.model('delivery', DeliverySchema)

module.exports = { 
    DeliverPerson
    //, Delivery 
}