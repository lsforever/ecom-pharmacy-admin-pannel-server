const express = require('express')
const router = express.Router()

const { validationResult } = require('express-validator')
const { product_input_check_create, product_input_check_update } = require('../middlewares/product_input_check')

const { Product, EyeGlassProduct, MedicineProduct, NormalProduct } = require('../models/Product')
const rolecheck = require('../middlewares/rolecheck')
const roles = require('../utils/constants/roles')
const auth = require('../middlewares/auth')

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
// @route       DELETE api/product?
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




            await Product.deleteMany({

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
// @route       DELETE api/product
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
            let output = await Product.findByIdAndDelete(mongoose.Types.ObjectId(id))
            res.status(200).json(output)


        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    }
)

// 04
// @route       PUT api/product
// @desc        Update user details (By admins or a user can update his other details after regitering with only email and password)
// @access      Private
router.put(
    '/:id',
    product_input_check_update,
    auth,
    rolecheck([
        roles.owner,
        roles.admin
    ]),
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }


        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid id received' })

            if (!res.locals.allowed) {
                return res.status(401).json({ message: 'Access denied' })
            }

            const {
                //kind,
                name,
                flag,
                price,
                category,
                images,
                brand,
                description,
                other,
                eye_glass_type,
                special_name,
                strength,
                medicine_type,
                strip,
                box,
                company_name,
                generic_name,
            } = req.body

            let update = {}



            if (name) update.name = name
            if (flag) update.flag = flag
            if (price) update.price = price
            if (category) {
                if (!mongoose.isValidObjectId(category)) {
                    return res.status(400).json({ message: 'Invalid ID for category' })
                }
                update.category = mongoose.Types.ObjectId(category)
            }
            if (images) update.images = images
            if (brand) update.brand = brand
            if (description) update.description = description

            let doc = await Product.findById(req.params.id)

            let output

            if (doc.kind === NormalProduct.modelName) {
                if (other) update.other = other

                output = await NormalProduct.findByIdAndUpdate(req.params.id, update)
            } else if (doc.kind === EyeGlassProduct.modelName) {
                if (eye_glass_type) update.eye_glass_type = eye_glass_type

                output = await EyeGlassProduct.findByIdAndUpdate(req.params.id, update)
            } else if (doc.kind === MedicineProduct.modelName) {
                if (special_name) update.special_name = special_name
                if (strength) update.strength = strength
                if (medicine_type) update.medicine_type = medicine_type
                if (strip) update.strip = strip
                if (box) update.box = box
                if (company_name) update.company_name = company_name
                if (generic_name) update.generic_name = generic_name

                output = await MedicineProduct.findByIdAndUpdate(req.params.id, update)
            } else {
                return res.status(400).json({ message: 'Invalid product kind' })
            }


            res.status(200).json(output)

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    }
)



// 03
// @route       GET api/product
// @desc        Get user by id
// @access      Public
// getOne	GET http://my.api.url/posts/123
router.get('/:id',
    auth,
    async (req, res) => {
        try {
            let output = await Product.findById(req.params.id).populate('category')
            res.status(200).json(output)

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    }
)


// 01
// @route       POST api/product
// @desc        create a category
// @access      Private
router.post(
    '/',
    product_input_check_create,
    auth,
    rolecheck([
        roles.owner,
        roles.admin
    ]),
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        if (!res.locals.allowed) {
            return res.status(401).json({ message: 'Access denied' })
        }





        try {

            const {
                kind,
                name,
                flag,
                price,
                category,
                images,
                brand,
                description,
                other,
                eye_glass_type,
                special_name,
                strength,
                medicine_type,
                strip,
                box,
                company_name,
                generic_name,
            } = req.body



            let base = {}

            if (name) base.name = name
            if (flag) base.flag = flag
            if (price) base.price = price
            if (category) {
                if (!mongoose.isValidObjectId(category)) {
                    return res.status(400).json({ message: 'Invalid ID for category' })
                }
                base.category = mongoose.Types.ObjectId(category)
            }
            if (images) base.images = images
            if (brand) base.brand = brand
            if (description) base.description = description


            let data;

            if (kind === NormalProduct.modelName) {
                if (other) base.other = other

                data = new NormalProduct(base)
            } else if (kind === EyeGlassProduct.modelName) {
                if (eye_glass_type) base.eye_glass_type = eye_glass_type

                data = new EyeGlassProduct(base)
            } else if (kind === MedicineProduct.modelName) {
                if (special_name) base.special_name = special_name
                if (strength) base.strength = strength
                if (medicine_type) base.medicine_type = medicine_type
                if (strip) base.strip = strip
                if (box) base.box = box
                if (company_name) base.company_name = company_name
                if (generic_name) base.generic_name = generic_name

                data = new MedicineProduct(base)
            } else {
                return res.status(400).json({ message: 'Invalid product kind' })
            }


            await data.save()
            res.status(200).json({ _id: data._id })

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    }
)

// 02
// @route       GET api/product
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

                ///////////////////////
                // Exact value filters
                ///////////////////////
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



                if (filter.category) {
                    if (!mongoose.isValidObjectId(filter.category)) {
                        delete filter.category
                    }
                }

                if (filter.brand) {
                    filter.brand = {
                        $regex: filter.brand,
                        $options: "i"
                    }
                }

                if (filter.description) {
                    filter.description = {
                        $regex: filter.description,
                        $options: "i"
                    }
                }


                //  Normal kind
                if (filter.other) {
                    filter.other = {
                        $regex: filter.other,
                        $options: "i"
                    }
                }



                // Eye glass kind
                if (filter.eye_glass_type) {
                    filter.eye_glass_type = {
                        $regex: filter.eye_glass_type,
                        $options: "i"
                    }
                }

                // Medicine kind
                if (filter.special_name) {
                    filter.special_name = {
                        $regex: filter.special_name,
                        $options: "i"
                    }
                }

                if (filter.strength) {
                    filter.strength = {
                        $regex: filter.strength,
                        $options: "i"
                    }
                }






                //TODO Add special product type filters and range filters

                // if (filter.medicine_type) {
                //     filter.medicine_type = {
                //         $regex: filter.medicine_type,
                //         $options: "i"
                //     }
                // }


                ///////////////////////
                // Range value filters
                ///////////////////////

                //TODO Add range filters




            } else {
                filter = {}
            }


            let product_list
            let count
            if (filter) {
                if (filter.kind === NormalProduct.modelName) {
                    delete filter.kind
                    product_list = await NormalProduct
                        .find(filter)
                        .populate('category')
                        .sort(sort)
                        .skip(range[0])
                        .limit(range[1])
                    count = await NormalProduct.countDocuments()
                } else if (filter.kind === EyeGlassProduct.modelName) {
                    delete filter.kind
                    product_list = await EyeGlassProduct
                        .find(filter)
                        .populate('category')
                        .sort(sort)
                        .skip(range[0])
                        .limit(range[1])
                    count = await EyeGlassProduct.countDocuments()
                } else if (filter.kind === MedicineProduct.modelName) {
                    delete filter.kind
                    product_list = await MedicineProduct
                        .find(filter)
                        .populate('category')
                        .sort(sort)
                        .skip(range[0])
                        .limit(range[1])
                    count = await MedicineProduct.countDocuments()

                } else {
                    delete filter.kind
                    product_list = await Product
                        .find(filter)
                        .populate('category')
                        .sort(sort)
                        .skip(range[0])
                        .limit(range[1])
                    count = await Product.countDocuments()

                }
            }

            const header = `products ${range[0] + 1}-${product_list.length + range[0]}/${count}`
            res.setHeader('Content-Range', header)
            res.status(200).json(product_list)

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    }
)










module.exports = router;
