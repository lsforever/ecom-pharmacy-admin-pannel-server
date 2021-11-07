const mongoose = require('mongoose')

module.exports = function (allowed) {
    return async (req, res, next) => {
        const found = allowed.some(item => mongoose.isValidObjectId(res.locals.user.roles[item]))
        if (found) {
            res.locals.allowed = true
        } else {
            res.locals.allowed = false
        }
        next()

    }

}

