const express = require('express');
const router = express.Router();
const {create,read, list} = require('../controllers/category')

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

const { userById } = require('../controllers/user');

router.post('/category/create/:userId', [requireSignin, isAuth, isAdmin,create])
router.get('/category/:userId',read)
router.get('/categories', list);
router.param('userId', userById);

module.exports = router;