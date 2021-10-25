const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator');

const {User,UserDetails,RolesDetails} = require('../models/User');
const { response } = require('express');

// @route       POST api/users
// @desc        Register a user
// @access      Public
// router.post(
//     '/',
//     [
//         check('name', 'Name is required')
//             .not()
//             .isEmpty(),
//         check('email', 'Email is invalid')
//             .isEmail(),
//         check('password', 'Password should be more than 6 characters')
//             .isLength({ min: 6 }),

//     ],
//     async (req, res) => {
//         const errors = validationResult(req)
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() })
//         }

//         const { name, email, password } = req.body
//         try {
//             let user = await User.findOne({ email })
//             if (user) {
//                 return res.status(400).json({ msg: 'User already exists' })
//             }

//             user = new User({
//                 name,
//                 email,
//                 password
//             })

//             const salt = await bcrypt.genSalt(10)
//             user.password = await bcrypt.hash(password, salt)
//             await user.save()

//             const payload = {
//                 user: {
//                     id: user.id
//                 }
//             }

//             jwt.sign(payload, config.get('jwtSecret'), {
//                 expiresIn: config.get('tokenLife')
//             }, (err, token) => {
//                 if (err) throw err
//                 res.status(200).json({ token })
//             })



//         } catch (error) {
//             console.error(error.message)
//             res.status(500).send('Server Error')

//         }
//     }
// );

router.post(
    '/',
    async (req, res) => {

        const { name, email, password } = req.body
       

        let user = new User({
            name,
            email,
            password,
            UserDetails
        })

        user.details = new UserDetails({
            name:'name',
            address:'address',
            other:'other'
        })
        
        
     
        await user.save()

        // user.RolesDetails.push(new RolesDetails({
        //     type:'kkkkk',
        //     ref_id:'refid29697638683'
        // }))
      
        res.status(200).json({ msg:'done' })
   


    }
);

module.exports = router;
