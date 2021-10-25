const mongoose = require('mongoose')
const roles = require('../utils/constants/roles')

const userDetails = mongoose.Schema({
    name : String,
    adress : String,
    other : String,
 });

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
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
        default: false
    },
    email_verified: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },

    details: [userDetails]
})

module.exports = mongoose.model('user', UserSchema)