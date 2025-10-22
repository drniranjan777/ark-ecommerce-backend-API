

const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin.route')
const userRoutes = require('./user.route')
const productRoutes = require('./products.route')
const catgeoryRoutes = require('./categories.route')
const uploadRoutes = require('./upload.route')
const couponRoutes = require('./coupon.route')
const cartRoutes = require('./cart.route')
const wishlistRoutes = require('./wishlist.route')
const homePageBannerRoutes = require('./homepageBanner.route')
const orderRoutes = require('./order.route')

router.use('/admin', adminRoutes)
router.use('/user', userRoutes)
router.use('/products',productRoutes)
router.use('/category',catgeoryRoutes)
router.use('/upload',uploadRoutes)
router.use('/coupon',couponRoutes)
router.use('/cart',cartRoutes)
router.use('/wishlist',wishlistRoutes)
router.use('/homepagebanner',homePageBannerRoutes)
router.use('/order',orderRoutes)

module.exports = router;