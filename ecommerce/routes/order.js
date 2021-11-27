const express = require('express');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { create, addOrderToUserHistory, listOrders, getStatusValues } = require('../controllers/order')
const { decreaseQuantity } = require('../controllers/product')


// router.post("/order/create/:userId", [requireSignin,isAuth,addOrderToUserHistory,decreaseQuantity, create]);
router.post("/order/create/:userId", [addOrderToUserHistory, decreaseQuantity, create]);
router.get('/orders/list/:userId', requireSignin, isAuth, isAdmin, listOrders)
router.get('/order/status-values/:userId', requireSignin, isAuth, isAdmin, getStatusValues)



router.param('userId', userById);

module.exports = router;