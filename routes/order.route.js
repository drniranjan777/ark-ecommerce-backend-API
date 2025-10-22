const express = require('express')
const router = express.Router()
const {OrderValidation,CommonValidate} = require('../validations/index')
const validate = require('../middlewares/validate')
const {OrderController} = require('../controllers/index')
const userAuth = require('../middlewares/userAuth')

/**
 * @swagger
 * /api/order/create:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *               - address
 *             properties:
 *               address:
 *                 type: object
 *                 required:
 *                   - fullName
 *                   - street
 *                   - city
 *                   - postalCode
 *                   - country
 *                   - phone
 *                 properties:
 *                   fullName:
 *                     type: string
 *                     example: "John Doe"
 *                   street:
 *                     type: string
 *                     example: "123 Gold Street"
 *                   city:
 *                     type: string
 *                     example: "Hyderabad"
 *                   state:
 *                     type: string
 *                     example: "Telangana"
 *                   postalCode:
 *                     type: string
 *                     example: "500001"
 *                   country:
 *                     type: string
 *                     example: "India"
 *                   phone:
 *                     type: string
 *                     example: "+91 9876543210"
 *               paymentStatus:
 *                 type: string
 *                 enum: [paid, unpaid, failed]
 *                 example: "paid"
 *               status:
 *                 type: string
 *                 enum: ['pending','confirmed','shipped','delivered','cancelled']
 *                 example: "confirmed"
 *     responses:
 *       201:
 *         description: Order created successfully
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
 *                   example: Order created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Validation error or bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post(
    '/create',
    userAuth,
    validate(OrderValidation.orderValidation),
    OrderController.createOrder
)

/**
 * @swagger
 * /api/order/user-orders:
 *   get:
 *     summary: Get all orders for the logged-in user
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user orders
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
 *                   example: Orders fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Order'
 *       401:
 *         description: Unauthorized - user not logged in or token invalid
 *       500:
 *         description: Internal server error
 */


router.get(
    '/user-orders',
    userAuth,
    OrderController.getUserOrders
)

/**
 * @swagger
 * /api/order/update/{orderId}:
 *   put:
 *     summary: Update an existing order by ID
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, confirmed, shipped, delivered, cancelled]
 *                 example: confirmed
 *               paymentStatus:
 *                 type: string
 *                 enum: [unpaid, paid, failed]
 *                 example: paid
 *               address:
 *                 type: object
 *                 properties:
 *                   fullName:
 *                     type: string
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   postalCode:
 *                     type: string
 *                   country:
 *                     type: string
 *                   phone:
 *                     type: string
 *     responses:
 *       200:
 *         description: Order updated successfully
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
 *                   example: Order updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request (invalid data)
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */


router.put(
    '/update/:orderId',
    OrderController.updateOrder
)
/**
 * @swagger
 * /api/order/:
 *   get:
 *     summary: Get all orders (with pagination)
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number (default is 1)
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of orders per page (default is 10)
 *         example: 10
 *     responses:
 *       200:
 *         description: Successfully fetched orders
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
 *                   example: Orders fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     orders:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Order'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 120
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                         totalPages:
 *                           type: integer
 *                           example: 12
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal server error
 */


router.get(
    '/',
    OrderController.getAllOrders
)

module.exports = router