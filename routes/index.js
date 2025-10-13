

const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin.route')
const userRoutes = require('./user.route')
const productRoutes = require('./products.route')

router.use('/admin', adminRoutes)
router.use('/user', userRoutes)
router.use('/products',productRoutes)

module.exports = router;