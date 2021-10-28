const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req,res,next){
    //Get token from header
    const token =req.header('x-auth-token')

    if(!token){
        return res.status(401).json({ message: 'No token, Authorization denied'})
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        res.locals.user = decoded.user
        next()

    } catch (error) {
        res.status(401).json({message: 'Invalid Token'})
    }

}