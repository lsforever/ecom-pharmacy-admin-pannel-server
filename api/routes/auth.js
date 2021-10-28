const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator');

const { generateTokenPayload } = require('../utils/other/extentions')
const auth = require('../middlewares/auth')

const User = require('../models/User');

// @route       GET api/uath
// @desc        Get logged in user (For a user)
// @access      Private
router.get('/', auth,
    async (req, res) => {
        try {
            let user = await User.findById(res.locals.user.id).select('-password')
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(400).json({ message: 'Invalid. No such user available' })
            }

        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server Error')

        }
    }
)


// @route       POST api/uath
// @desc        Auth user & get token (Login endpoint)
// @access      Public
router.post('/', (req, res) =>
    [
        check('email', 'Email Invalid').isEmail(),
        check('password', 'Password required').exists(),
    ]
    ,
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body
        try {
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ msg: 'Invalid Credentials' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' })
            }

           
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
    })




module.exports = router