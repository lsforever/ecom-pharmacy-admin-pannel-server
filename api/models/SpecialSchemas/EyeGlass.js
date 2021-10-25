const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,
        default: "n/a"
    },








    password: {
        type: String,
        required: true
    },
    // This is the roles user has so that later endpoints will be protected accordingly
    roles: {
        type: [
            {
                type: String,
            },
        ],
        default: [roles.basic_user],
    },
    // This is a boolean to detect if the user is accepted by the owner (Customers will be given "true" overiding the default "false" at the time they are created, but they will get only the basic role)
    accepted: {
        type: Boolean,
        required: true,
        default:false
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('product', UserSchema)