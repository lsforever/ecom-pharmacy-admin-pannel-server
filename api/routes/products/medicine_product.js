const express = require('express')
const router = express.Router()

const { check, validationResult } = require('express-validator')

const { MedicineProduct } = require('../../models/products/Product')
const rolecheck = require('../../middlewares/rolecheck')
const roles = require('../../utils/constants/roles')
const auth = require('../../middlewares/auth')
const { processFileArray } = require('../../middlewares/process_file')

const mongoose = require('mongoose')


const { uploadImage, deleteFileWithFileName } = require('../../utils/other/helpers')



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


            let medicines = await MedicineProduct.find({

                '_id': {
                    $in: ids.map(id => mongoose.Types.ObjectId(id))
                }

            })

            await MedicineProduct.deleteMany({

                '_id': {
                    $in: ids.map(id => mongoose.Types.ObjectId(id))
                }

            })




            try {
                let files_links = []
                medicines.forEach(medicine => {
                    if (medicine.types) {
                        medicine.types.forEach(type => {
                            if (type.strengths) {
                                type.strengths.forEach(strength => {
                                    if (strength.image) {
                                        files_links.push(strength.image)
                                    }
                                })

                            }
                        }
                        )
                    }

                })

                files_links.forEach(async item => await deleteFileWithFileName(item))
            } catch (e) {
                console.error(error.message)
            }

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



            let medicine = await MedicineProduct.findById(req.params.id)
            if (!medicine) return res.status(400).json({ message: 'No such medicine product available to delete' })
            let files_links = []
            if (medicine.types) {
                medicine.types.forEach(type => {
                    if (type.strengths) {
                        type.strengths.forEach(strength => {
                            if (strength.image) {
                                files_links.push(strength.image)
                            }
                        })

                    }
                }
                )
            }


            let output = await medicine.delete()


            try {
                files_links.forEach(async item => await deleteFileWithFileName(item))
            } catch (e) {

                console.error(e.message)
            }

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
    auth,
    rolecheck([
        roles.owner,
        roles.admin
    ]),
    processFileArray('files'),
    async (req, res) => {

        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() })
        // }


        try {
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ message: 'Invalid id received' })

            if (!res.locals.allowed) {
                return res.status(401).json({ message: 'Access denied' })
            }


            let medicine = await MedicineProduct.findById(req.params.id)
            if (!medicine) return res.status(400).json({ message: 'No such medicine product available to update' })
            let old_files_links = []
            if (medicine.types) {
                medicine.types.forEach(type => {
                    if (type.strengths) {
                        type.strengths.forEach(strength => {
                            if (strength.image) {
                                old_files_links.push(strength.image)
                            }
                        })

                    }
                }
                )

            }



            medicine.overwrite(JSON.parse(req.body.data))

            let new_files_links = []
            if (medicine.types) {
                await Promise.all(medicine.types.map(async type => {
                    if (type.strengths) {
                        await Promise.all(type.strengths.map(async strength => {
                            // Checking if the image is updated (Checking if the string is a index  number of file array)
                            if (strength.image && !isNaN(strength.image) && Number.isInteger(parseFloat(strength.image))) {
                                const url = await uploadImage(req.files[parseInt(strength.image)], MedicineProduct.modelName, strength._id + '' + Date.now())
                                const end_url = url.split("/").slice(-2).join("/")
                                strength.image = end_url

                            }
                            new_files_links.push(strength.image)
                            return strength
                        })
                        )
                    }
                })
                )
            }



            try {

                let files_to_delete = old_files_links.filter(item => !new_files_links.includes(item))
                files_to_delete.forEach(async item => await deleteFileWithFileName(item))
            } catch (e) {
                console.error(error.message)
            }

            await medicine.save()
            res.status(200).json(medicine)


        } catch (error) {

            if (error.code === 11000) {
                //Duplicate data
                return res.status(400).json({ message: 'Medicine with that name already exists' })
            }

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
            let output = await MedicineProduct
                .findById(req.params.id)
                .populate('category')
                .populate('generic')
                .populate('company')
                .populate("types.type")
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
    auth,
    rolecheck([
        roles.owner,
        roles.admin
    ]),
    processFileArray('files'),
    async (req, res) => {

        // const errors = validationResult(req)
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() })
        // }


        if (!res.locals.allowed) {
            return res.status(401).json({ message: 'Access denied' })
        }


        try {


            const medicine = new MedicineProduct(JSON.parse(req.body.data))

            if (medicine.types) {
                await Promise.all(medicine.types.map(async type => {
                    if (type.strengths) {
                        await Promise.all(type.strengths.map(async strength => {
                            if (strength.image) {
                                const url = await uploadImage(req.files[parseInt(strength.image)], MedicineProduct.modelName, strength._id + '')
                                const end_url = url.split("/").slice(-2).join("/")
                                strength.image = end_url
                            }
                            return strength
                        })
                        )
                    }
                })
                )
            }

           

            await medicine.save()
            res.status(200).json({ _id: medicine._id })

        } catch (error) {

            if (error.code === 11000) {
                //Duplicate data
                return res.status(400).json({ message: 'Medicine with that name already exists' })
            }

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
                sort = { "medicine_name": "asc" }
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

                if (filter.medicine_name) {
                    filter.medicine_name = {
                        $regex: filter.medicine_name,
                        $options: "i"
                    }
                }


                if (filter.genric_name) {
                    filter.genric_name = {
                        $regex: filter.genric_name,
                        $options: "i"
                    }
                }




                if (filter.category) {
                    if (!mongoose.isValidObjectId(filter.category)) {
                        delete filter.category
                    }
                }


            } else {
                filter = {}
            }


            const med_list = await MedicineProduct
                .find(filter)
                .populate('category')
                .populate('generic')
                .populate('company')
                .populate("types.type")
                .sort(sort)
                .skip(range[0])
                .limit(range[1])
            const count = await MedicineProduct.countDocuments()



            const header = `medicine_products ${range[0] + 1}-${med_list.length + range[0]}/${count}`
            res.setHeader('Content-Range', header)
            res.status(200).json(med_list)

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    }
)










module.exports = router;
