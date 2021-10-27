const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const { User } = require('../models/User')
const { generateTokenPayload } = require('../utils/other/extentions')
const auth = require('../middlewares/auth')

// getList	GET http://my.api.url/posts?sort=["title","ASC"]&range=[0, 24]&filter={"title":"bar"}
// getOne	GET http://my.api.url/posts/123
// getMany	GET http://my.api.url/posts?filter={"id":[123,456,789]}
// getManyReference	GET http://my.api.url/posts?filter={"author_id":345}
// 01 // create	POST http://my.api.url/posts
// update	PUT http://my.api.url/posts/123
// updateMany	Multiple calls to PUT http://my.api.url/posts/123
// delete	DELETE http://my.api.url/posts/123
// deleteMany	Multiple calls to DELETE http://my.api.url/posts/123


// 01
// @route       POST api/users
// @desc        Register a user (create a user)
// @access      Public
router.post(
    '/',
    [
        check('email', 'Email is invalid')
            .isEmail(),
        check('password', 'Password should be more than 6 characters')
            .isLength({ min: 6 }),

    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body
        try {
            let user = await User.findOne({ email })
            if (user) {
                return res.status(400).json({ message: 'User already exists' })
            }

            user = new User({
                email,
                password
            })

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            await user.save()

            const payload = generateTokenPayload(user)

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: config.get('tokenLife')
            }, (err, token) => {
                if (err) throw err
                res.status(200).json({ token })
            })


        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    }
)


// @route       GET api/users
// @desc        Get Users list with sort and filters
// @access      Private
router.post(
    '/',
    [
        check('email', 'Email is invalid')
            .isEmail(),
        check('password', 'Password should be more than 6 characters')
            .isLength({ min: 6 }),

    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body
        try {
            let user = await User.findOne({ email })
            if (user) {
                return res.status(400).json({ message: 'User already exists' })
            }

            user = new User({
                email,
                password
            })

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            await user.save()

            const payload = generateTokenPayload(user)

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: config.get('tokenLife')
            }, (err, token) => {
                if (err) throw err
                res.status(200).json({ token })
            })


        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')
        }
    }
)






// @route       GET api/users
// @desc        Get logged in user details
// @access      Private
// router.get('/', auth,
//     async (req, res) => {
//         try {
//             let user = await User.findById( req.user.id ).select('-password')
//             if (user) {
//                 res.status(200).json(user)
//             }else{
//                 res.status(400).json({ message: 'Invalid. No such user available' })
//             }

//         } catch (error) {
//             console.error(error.message)
//             res.status(500).send('Server Error')

//         }
//     }
// )




// check('name', 'Name is required')
//             .not()
//             .isEmpty(),



module.exports = router;
