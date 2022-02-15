const express = require('express')
const router = express.Router()

// Login
router.get('/', (req, res) => {
    res.render('login.ejs')
})

router.post('/login', (req, res) => {

})

module.exports = router