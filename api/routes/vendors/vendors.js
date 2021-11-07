const express = require('express')
const router = express.Router()

const { check, validationResult } = require('express-validator')

const Vendor = require('../../models/Vendor')
const {User} = require('../../models/User')

const rolecheck = require('../../middlewares/rolecheck')
const roles = require('../../utils/constants/roles')
const auth = require('../../middlewares/auth')

const mongoose = require('mongoose')


// 02 getList	                        GET     http://my.api.url/posts?sort=["title","ASC"]&range=[0, 24]&filter={"title":"bar"}
// 02 getMany	                        GET     http://my.api.url/posts?filter={"_id":[123,456,789]}
// 02 getManyReference	                GET     http://my.api.url/posts?filter={"author_id":345}
// 03 getOne	                        GET     http://my.api.url/posts/123
// 01 // create	                        POST    http://my.api.url/posts
// 04 update	                        PUT     http://my.api.url/posts/123
// 04 updateMany(Multiple calls to)     PUT     http://my.api.url/posts/123
// 05 delete	                        DELETE  http://my.api.url/posts/123
// 06 deleteMany(Filter calls to)       DELETE  http://my.api.url/posts/123


// 06
// @route       DELETE api/product-categories?
// @desc        Delete many user (Only admins | others can only disable account)
// @access      Private
// Params       DELETE api/users?filter={"_id":[123,456,789]}
router.delete(
    '/',
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

            //Site.deleteMany({ _id: [1, 2, 3] });
            const filter = JSON.parse(req.query.filter)

            if (!filter) {
                return res.status(400).json({ message: '_ids cannot be empty' })
            }

            let ids = filter._id
            for (const s of ids) {
                if (!mongoose.Types.ObjectId.isValid(s)) return res.status(400).json({ message: 'Invalid ids received' })
            }




            await Vendor.deleteMany({

                '_id': {
                    $in: ids.map(id => mongoose.Types.ObjectId(id))
                }

            })


            res.status(200).json({ _ids: ids })

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    }
)


// 05
// @route       DELETE api/product-categories
// @desc        Delete user (Only admins | others can only disable account)
// @access      Private
router.delete(
    '/:id',
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


            const id = req.params.id
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id received' })
            let output = await Vendor.findByIdAndDelete(mongoose.Types.ObjectId(id))
            res.status(200).json(output)


        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    }
)

// 04
// @route       PUT api/product-categories
// @desc        Update user details (By admins or a user can update his other details after regitering with only email and password)
// @access      Private
router.put(
    '/:id',
    [
        check('flag', 'Name should not be empty')
            .isBoolean()
            .optional(),

    ],
    auth,
    rolecheck([
        roles.owner,
        roles.admin,
    ]),
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }


        try {
            //if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid parameter id received' })


            if (!(res.locals.user.roles[roles.vendor] === req.params.id) && !res.locals.allowed) {
                return res.status(401).json({ message: 'Access denied' })
            }



            const {
                name,
                flag,
                user,
                type,
                address,
                contact,
                location,
                owner_img,
                drug_license,
                trade_license

            } = req.body

            if (user && !mongoose.Types.ObjectId.isValid(user)) return res.status(400).json({ message: 'Invalid user id received' })


            let output = await Vendor.findByIdAndUpdate(req.params.id,
                {
                    name,
                    flag,
                    user,
                    type,
                    address,
                    contact,
                    location,
                    owner_img,
                    drug_license,
                    trade_license
                })
            res.status(200).json(output)

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Something went wrong')
        }
    }
)



// 03
// @route       GET api/product-categories
// @desc        Get user by id
// @access      Private
// getOne	GET http://my.api.url/posts/123
router.get('/:id',
    auth,
    async (req, res) => {
        try {
            let output = await Vendor.findById(req.params.id)
            res.status(200).json(output)

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    }
)


// 01
// @route       POST api/vendors
// @desc        create a Vendor
// @access      Private
router.post(
    '/',
    [
        check('email', 'Email invalid')
            .isEmail(),
        check('name', 'Empty name')
            .isEmail(),

    ],
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }


        const { email, name } = req.body

        try {

            let user_ref = await User.find({ email: email })

            if(!user){
                return res.status(400).json({ message: "User with that email is not available. Register as a user first" })
            }

       

            item = new Vendor({
                email,
                name,
                user:mongoose.Types.ObjectId(user_ref._id)
            })


            await User.findByIdAndUpdate(user_ref._id,
                {
                    [`roles.${roles.vendor}`]:item._id
                })
            await item.save()
            res.status(200).json({ _id: item._id })

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    }
)

// 02
// @route       GET api/product-categories
// @desc        Get Users list with sort and filters
// @access      Private
// getList	    GET http://my.api.url/users?sort={"title","asc||desc"}&range=[0, 24]&filter={"title":"bar"}  // Range 0 = start and 24 = per page limit
// String Parameters => sort={"title","asc||desc"} || range=[0, 24] || filter={"title":"bar"}
// getMany	    GET http://my.api.url/posts?filter={"_id":[123,456,789]}   || use (_id) in client 
// getManyReference	  GET http://my.api.url/posts?filter={"author_id":345}  || Just provide the correct mongodb filter from client and it will work
// Above can send a filter like this => { 'roles.vendor.ref_id': 'the id here'}
router.get('/',
    auth,

    async (req, res) => {
        try {

            let { sort, range, filter } = req.query

            if (range) {
                range = JSON.parse(range)
            } else {
                range = [0, 0]
            }
            if (sort) {
                sort = JSON.parse(sort)
            } else {
                sort = { "name": "asc" }
            }
            if (filter) {
                filter = JSON.parse(filter)
                if (filter._id) {
                    if (!mongoose.isValidObjectId(filter._id)) {
                        delete filter._id
                    }
                }

                if (filter.name) {
                    filter.name = {
                        $regex: filter.name,
                        $options: "i"
                    }
                }

            } else {
                filter = {}
            }



            let cat_list = await Vendor
                .find(filter)
                .sort(sort)
                .skip(range[0])
                .limit(range[1])


            const count = await ProductCategory.countDocuments()
            const header = `vendors ${range[0] + 1}-${cat_list.length + range[0]}/${count}`
            res.setHeader('Content-Range', header)
            res.status(200).json(cat_list)

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    }
)










module.exports = router;
