const express = require('express');
const router = express.Router();
const { requireSignin, isAuth } = require('../controllers/auth');
const {sendMail} = require('../controllers/mail')


router.get('/send', sendMail)

module.exports= router