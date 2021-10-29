// Use this header in products routes to  send only the published products

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