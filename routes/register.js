const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// Register
router.get('/', (req, res) => {
    res.render('register.ejs')
})

router.post('/', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword
    })
    try {
        const newUser = await user.save()
        res.redirect('/login')
    } catch (error) {
        res.redirect('/register')
        console.log(error)
    }
    console.log(user)
})

module.exports = router