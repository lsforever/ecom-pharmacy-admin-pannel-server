const express = require('express')
const router = express.Router()
const config = require('config')
const { check, validationResult } = require('express-validator')


const { generateTokenPayload } = require('../utils/other/extentions')
const rolecheck = require('../middlewares/rolecheck')
const roles = require('../utils/constants/roles')
const auth = require('../middlewares/auth')

const mongoose = require('mongoose')
const {Product ,MedicineProduct,EyeGlassProduct, OtherProduct} = require('../models/Product');


// 02 getList	                        GET     http://my.api.url/posts?sort=["title","ASC"]&range=[0, 24]&filter={"title":"bar"}
// 02 getMany	                        GET     http://my.api.url/posts?filter={"_id":[123,456,789]}
// 02 getManyReference	                GET     http://my.api.url/posts?filter={"author_id":345}
// 03 getOne	                        GET     http://my.api.url/posts/123
// 01 // create	                        POST    http://my.api.url/posts
// 04 update	                        PUT     http://my.api.url/posts/123
// 04 updateMany(Multiple calls to)     PUT     http://my.api.url/posts/123
// 05 delete	                        DELETE  http://my.api.url/posts/123
// 06 deleteMany(Filter calls to)       DELETE  http://my.api.url/posts/123


// // 06
// // @route       DELETE api/users?
// // @desc        Delete many user (Only admins | others can only disable account)
// // @access      Private
// // Params       DELETE api/users?filter={"_id":[123,456,789]}
// router.delete(
//     '/',
//     auth,
//     async (req, res) => {
//         try {
//             //Site.deleteMany({ _id: [1, 2, 3] });
//             const filter = JSON.parse(req.query.filter)
//             let ids;
//             if (filter) {
//                 ids = filter._id
//             } else {
//                 return res.status(400).json({ message: '_ids cannot be empty' })
//             }

          

//             const caller = res.locals.user
          
//             let mapped_ids = ids.map(id => mongoose.Types.ObjectId(id))

//             let query = {
//                 'roles.type': { $eq: "null" }
//             }



//             if (caller.roles.includes(roles.owner)) {
//                 query = {
//                     $and: [
//                         {
//                             '_id': {
//                                 $in: mapped_ids
//                             }
//                         }
//                         ,
//                         {
//                             'roles.type': { $ne: "owner" }
//                         }
    
//                     ]
    
//                 }

//             } else if (caller.roles.includes(roles.admin)) {
//                 query = {
//                     $and: [
//                         {
//                             '_id': {
//                                 $in: mapped_ids
//                             }
//                         }
//                         ,
//                         {
//                             'roles.type': { $ne: "owner" }
//                         },
//                         {
//                             'roles.type': { $ne: "admin" }
//                         }
    
//                     ]
    
//                 }
//             } else {
//                 return res.status(401).json({ message: 'Access denied' })
//             }
//             let count = await User.deleteMany(query)



//             if (count != mapped_ids.length) {
//                 let available = await User.find(
//                     {
//                         '_id': {
//                             $in: mapped_ids
//                         }
//                     }
//                     ,
//                     '_id'
//                 )
//                 available = available.map(item => item._id.toString())

//                 ids = ids.filter(function (el) {
//                     return !available.includes(el);
//                 })
//                 console.log(mapped_ids)
//                 console.log(available)
//             }
//             console.log(count)
//             console.log(ids)

//             res.status(200).json({_ids :ids})



//         } catch (error) {
//             console.error(error.message)
//             res.status(500).send('Server Error')
//         }
//     }
// )


// // 05
// // @route       DELETE api/users
// // @desc        Delete user (Only admins | others can only disable account)
// // @access      Private
// router.delete(
//     '/:id',
//     auth,
//     async (req, res) => {
//         try {
//             const id = req.params.id
//             const caller = res.locals.user
//             let user = await User.findById(id)
//             const rolesAvailable = user.roles
//                 .filter(role => role.flag)
//                 .map(role => role.type)

//             if (caller.roles.includes(roles.owner)) {
//                 // Owner
//                 if (rolesAvailable.includes(roles.owner)) {
//                     return res.status(401).json({ message: 'Access denied' })
//                 } else {
//                     let output = await User.findByIdAndDelete(id)
//                     res.status(200).json(output)
//                 }
//             } else if (caller.roles.includes(roles.admin)) {
//                 // Admin
//                 if (rolesAvailable.includes(roles.owner) || rolesAvailable.includes(roles.admin)) {
//                     return res.status(401).json({ message: 'Access denied' })
//                 } else {
//                     let output = await User.findByIdAndDelete(id)
//                     res.status(200).json(output)
//                 }
//             } else {
//                 return res.status(401).json({ message: 'Access denied' })
//             }

//         } catch (error) {
//             console.error(error.message)
//             res.status(500).send('Server Error')
//         }
//     }
// )

// // 04
// // @route       PUT api/users
// // @desc        Update user details (By admins or a user can update his other details after regitering with only email and password)
// // @access      Private
// router.put(
//     '/:id',
//     [
//         check('details.birthday', 'Birthday should be a date')
//             .isDate()
//             .optional({ checkFalsy: true }),
//         check('email_verified', 'Email Verified should be a boolean')
//             .isBoolean()
//             .optional({ nullable: true }),

//     ],
//     auth,
//     rolecheck([
//         roles.owner,
//         roles.admin
//     ]),
//     async (req, res) => {

//         const errors = validationResult(req)
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() })
//         }



//         try {

//             const { email_verified, details } = req.body

//             let update = {}

//             // Roles will not be edited to true or false from here, It will be updated only within server in corresponding endpoint like vendor or admin  with the client actions.
//             // Therefore admins cannot change owner roles, but can change details of owners. This is a feature. If you don't want that, then fetch the doc and exclude owners before update
//             if (res.locals.allowed) {
//                 if (email_verified) update.email_verified = email_verified
//             } else if (res.locals.user.id !== req.params.id) {
//                 return res.status(401).json({ message: 'Access denied' })
//             }

//             if (details.name) {
//                 update['details.name'] = details.name
//             }
//             if (details.address) update['details.address'] = details.address
//             if (details.birthday) update['details.birthday'] = details.birthday



//             let output = await User.findByIdAndUpdate(req.params.id, update)
//             res.status(200).json(output)

//         } catch (error) {
//             console.error(error)
//             console.error(error.message)
//             res.status(500).send('Server Error')
//         }
//     }
// )



// // 03
// // @route       GET api/users
// // @desc        Get user by id
// // @access      Private
// // getOne	GET http://my.api.url/posts/123
// router.get('/:id',
//     auth,
//     rolecheck([
//         roles.owner,
//         roles.admin
//     ]),
//     async (req, res) => {
//         try {
//             if (!res.locals.allowed) {
//                 return res.status(401).json({ message: 'Access denied' })
//             }

//             let user = await User.findById(req.params.id)

//             if (user) {
//                 res.status(200).json(user)
//             } else {
//                 res.status(400).json({ message: 'No such user' })
//             }


//         } catch (error) {
//             console.error(error.message)
//             res.status(500).send('Server Error')
//         }
//     }
// )

// 01
// @route       POST api/users
// @desc        Register a user (create a user)
// @access      Public
router.post(
    '/',
    // [
    //     check('email', 'Email is invalid')
    //         .isEmail(),
    //     check('password', 'Password should be more than 6 characters')
    //         .isLength({ min: 6 }),

    // ],
    async (req, res) => {
        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() })
        // }

        const { name, flag, price, category ,brand, images ,description } = req.body
        try {

  

            let product = new Product({
                name,
                flag,
                price,
                brand,
                description,
                category:"sssssss"
            })

      
            await product.save()

    

            
            res.status(200).json({ _id: product._id })
           


        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    }
)

// 02
// @route       GET api/products
// @desc        Get Users list with sort and filters
// @access      Private
// getList	    GET http://my.api.url/users?sort={"title","asc||desc"}&range=[0, 24]&filter={"title":"bar"}  // Range 0 = start and 24 = per page limit
// String Parameters => sort={"title","asc||desc"} || range=[0, 24] || filter={"title":"bar"}
// getMany	    GET http://my.api.url/posts?filter={"_id":[123,456,789]}   || use (_id) in client 
// getManyReference	  GET http://my.api.url/posts?filter={"author_id":345}  || Just provide the correct mongodb filter from client and it will work
// Above can send a filter like this => { 'roles.vendor.ref_id': 'the id here'}
router.get('/',
    auth,
    rolecheck([
        roles.owner,
        roles.admin
    ]),
    async (req, res) => {
        try {
            if (!res.locals.allowed) {
                return res.status(401).json({ message: 'Access denied' })
            }



            let product_list = await Product.find()


            if (product_list) {
                const count = await Product.countDocuments()
                //const header = `users ${range[0] + 1}-${product_list.length + range[0]}/${count}`
                const header = `products ${0 + 1}-${product_list.length + 0}/${count}`
                res.setHeader('Content-Range', header)
                res.status(200).json(product_list)
            } else {
                res.status(400).json({ message: 'Invalid Query Or No data available' })
            }



        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    }
)










module.exports = router;
