module.exports = function (allowed) {
    return async (req, res, next) => {
        const found = allowed.some(r => decoded.user.roles.includes(r))
        if (found) {
            res.locals.allowed = true
        } else {
            res.locals.allowed = false
        }
        next()

    }

}

