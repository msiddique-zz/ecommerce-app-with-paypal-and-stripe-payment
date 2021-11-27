const express = require('express');
const router = express.Router();
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { productById, read, create, update, list, remove, photo, listBySearch, listSearch } = require('../controllers/product');


router.get('/product/:productId', read)
router.get("/products/search", listSearch);
router.post('/product/create/:userId', [requireSignin, isAuth, isAdmin, create])
router.post("/product/by/search", listBySearch);
router.delete('/product/:productId/:userId', [requireSignin, isAuth, isAdmin, remove])

router.get("/products", list);
router.get("/product/photo/:productId", photo)
router.put("/product/:productId/:userId", requireSignin, isAuth, isAdmin, update);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;