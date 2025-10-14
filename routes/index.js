

const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin.route')
const userRoutes = require('./user.route')
const productRoutes = require('./products.route')
const catgeoryRoutes = require('./categories.route')
const uploadRoutes = require('./upload.route')

router.use('/admin', adminRoutes)
router.use('/user', userRoutes)
router.use('/products',productRoutes)
router.use('/category',catgeoryRoutes)
router.use('/upload',uploadRoutes)

module.exports = router;