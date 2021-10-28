
module.exports = function(req,res,next){
    //Get value from header
    const is_customer =req.header('is-customer')

    if(is_customer){
       res.locals.is_customer = true
    }else{
        res.locals.is_customer = false
    }
    next()
}