const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route       GET api/uath
// @desc        Get logged in user
// @access      Private
router.get('/',
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
            if(!user){
                return res.status(400).json({ msg: 'Invalid Credentials'})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            
            if(!isMatch){
                return res.status(400).json({ msg: 'Invalid Credentials'})
            }

            user = new User({
                name,
                email,
                password
            })

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            await user.save()

            const payload = {
                user: {
                    id: user.id
                }
            }

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

// @route       POST api/uath
// @desc        Auth user & get token
// @access      Public
router.post('/', (req, res) => {
    res.send('log in user')
})

module.exports = router