const express = require('express')
const router = express.Router();
// const {generateToken, processPayment} = require('../controllers/braintree')
const { Paypal, PaypalExecute } = require('../controllers/paypal')

const { requireSignin, isAuth, } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post('/paypal/pay/:userId', Paypal)
router.get('/success', PaypalExecute)
router.get('/cancel', (req, res) => { res.send('cancelled') })

router.param('userId', userById);

module.exports = router;