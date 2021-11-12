const mongoose = require('mongoose')
const roles = require('../utils/constants/roles')


const UserDetailsSchema = mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    birthday: {
        type: Date
    },
}

    , { _id: false }

)






// Only add this role details here , after admin aproves their roles
// ref id is the object id for the rechord in corresponding collection for that role
const RoleDetailsSchema = mongoose.Schema({
    [roles.owner]: {
        type: mongoose.Types.ObjectId,
        ref: roles.owner
    },
    [roles.admin]: {
        type: mongoose.Types.ObjectId,
        ref: roles.admin
    },
    [roles.vendor]: {
        type: mongoose.Types.ObjectId,
        ref: roles.vendor
    },
    [roles.delivery_person]: {
        type: mongoose.Types.ObjectId,
        ref: roles.delivery_person
    },
}
    , { _id: false }
)

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
    // Only add roles here if the role is accepted by admin (Only the users with elevated permisions should be added. Others not needed)
    roles: {
        type: RoleDetailsSchema,
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    details: UserDetailsSchema
},
    { timestamps: true }
)

const User = mongoose.model('user', UserSchema)

const RoleDetails = mongoose.model('role', RoleDetailsSchema)
const UserDetails = mongoose.model('user_details', UserDetailsSchema)

module.exports = { User, RoleDetails, UserDetails }