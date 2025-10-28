
const express = require('express')
const router = express.Router()
const {CouponController} = require('../controllers/index')
const validate = require("../middlewares/validate")
const {CouponValidation,CommonValidate} = require("../validations/index")

/**
 * @swagger
 * /api/coupon:
 *   post:
 *     summary: Create a new coupon
 *     tags: [Coupon]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - coupon
 *               - discount
 *             properties:
 *               coupon:
 *                 type: string
 *                 example: SAVE10
 *               discount:
 *                 type: number
 *                 example: 10
 *     responses:
 *       201:
 *         description: Coupon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Coupon created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 652abc123def4567890abcde
 *                     coupon:
 *                       type: string
 *                       example: SAVE10
 *                     discount:
 *                       type: number
 *                       example: 10
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid request payload
 *       409:
 *         description: Coupon already exists
 *       500:
 *         description: Server error
 */

router.post('/',
 validate(CouponValidation.validateCoupon),
 CouponController.createCoupon
)

/**
 * @swagger
 * /api/coupon/{couponId}:
 *   get:
 *     summary: Get a coupon by ID
 *     tags: [Coupon]
 *     parameters:
 *       - in: path
 *         name: couponId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the coupon to retrieve
 *     responses:
 *       200:
 *         description: Coupon found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Coupon fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 652abc123def4567890abcde
 *                     coupon:
 *                       type: string
 *                       example: SAVE10
 *                     discount:
 *                       type: number
 *                       example: 10
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid coupon ID
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Server error
 */

router.get('/:couponId',
 validate(CommonValidate.objectId('couponId'),'params'),
 CouponController.getCouponbyId
)

/**
 * @swagger
 * /api/coupon/{couponId}:
 *   put:
 *     summary: Update a coupon by ID
 *     tags: [Coupon]
 *     parameters:
 *       - in: path
 *         name: couponId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the coupon to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               coupon:
 *                 type: string
 *                 example: SAVE20
 *               discount:
 *                 type: number
 *                 example: 20
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Coupon Updated Successfully
 *                 updatedCoupon:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 652abc123def4567890abcde
 *                     coupon:
 *                       type: string
 *                       example: SAVE20
 *                     discount:
 *                       type: number
 *                       example: 20
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid input or coupon ID
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Server error
 */


router.put('/:couponId',
 validate(CommonValidate.objectId('couponId'),'params'),
 validate(CouponValidation.validateCoupon),
 CouponController.updateCoupon
)

/**
 * @swagger
 * /api/coupon:
 *   get:
 *     summary: Get list of coupons with pagination
 *     tags:
 *       - Coupon
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination (starts from 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of coupons per page
 *     responses:
 *       200:
 *         description: List of coupons retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 total:
 *                   type: integer
 *                   example: 54
 *                 totalPages:
 *                   type: integer
 *                   example: 6
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 65286c6d7082734f65c6211d
 *                       coupon:
 *                         type: string
 *                         example: SAVE20
 *                       discount:
 *                         type: number
 *                         example: 20
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-10-01T12:00:00Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2023-10-01T12:00:00Z
 *       500:
 *         description: Server error
 */


router.get('/',
 CouponController.getCoupons
)

/**
 * @swagger
 * /api/coupon/{couponId}:
 *   delete:
 *     summary: Delete a coupon by ID
 *     tags: [Coupon]
 *     parameters:
 *       - in: path
 *         name: couponId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the coupon to delete
 *     responses:
 *       200:
 *         description: Coupon deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Coupon deleted successfully
 *                 data:
 *                   type: object
 *                   example:
 *                     _id: "65286c6d7082734f65c6211d"
 *                     coupon: "SAVE10"
 *                     discount: 10
 *                     createdAt: "2023-10-01T12:00:00Z"
 *                     updatedAt: "2023-10-02T12:00:00Z"
 *       400:
 *         description: Invalid coupon ID
 *       404:
 *         description: Coupon not found
 *       500:
 *         description: Server error
 */


router.delete('/:couponId',
 validate(CommonValidate.objectId('couponId'),'params'),
 CouponController.deleteCoupon
)

/**
 * @swagger
 * /api/coupon/apply:
 *   post:
 *     summary: Apply a coupon to calculate the discounted total
 *     description: Validates and applies a coupon code based on total cart value.
 *     tags: [Coupon]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - total
 *               - couponCode
 *             properties:
 *               total:
 *                 type: number
 *                 example: 1500
 *               couponCode:
 *                 type: string
 *                 example: SAVE100
 *     responses:
 *       200:
 *         description: Coupon applied successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Coupon applied successfully
 *                 couponCode:
 *                   type: string
 *                   example: SAVE100
 *                 discount:
 *                   type: number
 *                   example: 100
 *                 totalBeforeDiscount:
 *                   type: number
 *                   example: 1500
 *                 totalAfterDiscount:
 *                   type: number
 *                   example: 1400
 *       400:
 *         description: Invalid coupon or minimum purchase not met
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Minimum purchase of ₹1000 required
 *       404:
 *         description: Coupon not found or inactive
 *       500:
 *         description: Internal server error
 */


router.post('/apply',
//  validate(CommonValidate.objectId('couponId'),'params'),
validate(CouponValidation.applyCoupon),
 CouponController.applyCoupon
)

module.exports = router