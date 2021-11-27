const express = require('express')
const {signup,signin,signout}= require('../controllers/auth')
const {userSignupValidator} = require('../validator')
const passport = require("passport");
const {facebookLogin} = require('../controllers/auth')

const router = express.Router()

router.post('/signup',[userSignupValidator, signup])
router.post('/signin', signin)
router.get('/signout', signout)

// router.post('/facebook-login', facebookLogin)

router.get('/hello',(req,res)=>{
    res.send('Hello there!')
})

module.exports = router;
