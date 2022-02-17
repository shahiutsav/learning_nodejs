const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const passport = require('passport')
const bcrypt = require('bcrypt')


const initializePassport = require('../passport-config')
initializePassport(passport,
    email =>
        Admin.findOne({ email: email }),
    id => Admin.findOne({ id: id })
)


// Login
router.get('/login/admin', checkNotAuthenticated, (req, res) => {
    res.render('login_admin.ejs')
})

router.post('/login/admin', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login/admin',
    failureFlash: true
}))

// Register
router.get('/register/admin', checkNotAuthenticated, (req, res) => {
    res.render('register_admin.ejs')
})

router.post('/register/admin', checkNotAuthenticated, async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const admin = new Admin({
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword
    })
    try {
        const newAdmin = await admin.save()
        res.redirect('/login/admin')
    } catch (error) {
        res.redirect('/register/admin')
        console.log(error)
    }
    console.log('worked')
    console.log(admin)
})

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}


module.exports = router