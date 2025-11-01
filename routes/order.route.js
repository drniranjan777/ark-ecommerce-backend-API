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

/**
 * @swagger
 * /api/order/analytics:
 *   get:
 *     summary: Get order analytics and statistics
 *     description: Retrieve summary analytics for all orders such as total count, total revenue, and status breakdown.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Filter analytics starting from this date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Filter analytics up to this date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Order analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalOrders:
 *                   type: integer
 *                   example: 1250
 *                   description: Total number of orders
 *                 totalRevenue:
 *                   type: number
 *                   format: float
 *                   example: 254830.75
 *                   description: Total revenue from all orders
 *                 ordersByStatus:
 *                   type: object
 *                   example:
 *                     pending: 120
 *                     completed: 980
 *                     cancelled: 150
 *                     refunded: 10
 *                   description: Breakdown of orders by their status
 *          
 *       400:
 *         description: Invalid date format or bad request
 *       500:
 *         description: Internal server error
 */

router.get(
    '/analytics',
    OrderController.orderAnalytics
)

/**
 * @swagger
 * /api/order/{orderId}:
 *   get:
 *     summary: Get detailed information about a specific order
 *     description: Retrieve complete order details by order ID, including products, user info, and status.
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           example: 64fa72b12c5a9b3d5e1a9c2e
 *         description: The unique ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 64fa72b12c5a9b3d5e1a9c2e
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64f86b9e0b4e8a23ac7a112c
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: john@example.com
 *                 status:
 *                   type: string
 *                   example: confirmed
 *                 amount:
 *                   type: number
 *                   example: 2499.99
 *                 paymentMethod:
 *                   type: string
 *                   example: UPI
 *                 address:
 *                   type: object
 *                   properties:
 *                     street:
 *                       type: string
 *                       example: 123 MG Road
 *                     city:
 *                       type: string
 *                       example: Bangalore
 *                     pincode:
 *                       type: string
 *                       example: 560001
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                         example: 64f973db2a77d43cf51eae11
 *                       name:
 *                         type: string
 *                         example: iPhone 15 Pro
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *                       price:
 *                         type: number
 *                         example: 1249.99
 *       400:
 *         description: Invalid order ID format
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

router.get(
    '/:orderId',
    OrderController.orderDetails
)

/**
 * @swagger
 * /api/order/orderitem:
 *   put:
 *     summary: Update the status of a specific order item
 *     description: Update the status of an order item using orderId and productId.
 *     tags:
 *       - Order Items
 *     security:
 *       - bearerAuth: []    # requires authentication (e.g., JWT)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - productId
 *               - status
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "671fcb8c7d9e0a123456789a"
 *                 description: Unique ID of the order.
 *               productId:
 *                 type: string
 *                 example: "671fcb8c7d9e0a987654321b"
 *                 description: Unique ID of the product within the order.
 *               status:
 *                 type: string
 *                 enum: [pending, shipped, delivered, cancelled]
 *                 example: "shipped"
 *                 description: New status for the order item.
 *     responses:
 *       200:
 *         description: Order item status updated successfully
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
 *                   example: Order item status updated successfully
 *                 data:
 *                   type: object
 *                   example:
 *                     success: true
 *       400:
 *         description: Bad Request (missing or invalid fields)
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
 *                   example: Invalid status value
 *       404:
 *         description: Order item not found
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
 *                   example: Order item not found
 */

router.put(
    '/orderitem',
    validate(OrderValidation.updateOrderItemStatus),
    OrderController.updateOrderItemStatus
)

/**
 * @swagger
 * /api/order/refund:
 *   put:
 *     summary: Update the refund of a specific order item
 *     description: Update the status of an order item using orderId and productId.
 *     tags:
 *       - Order Items
 *     security:
 *       - bearerAuth: []    # requires authentication (e.g., JWT)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - productId
 *               - status
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: "671fcb8c7d9e0a123456789a"
 *                 description: Unique ID of the order.
 *               productId:
 *                 type: string
 *                 example: "671fcb8c7d9e0a987654321b"
 *                 description: Unique ID of the product within the order.
 *               refundStatus:
 *                 type: string
 *                 enum: [none,initiated,completed,failed]
 *                 example: "initiated"
 *                 description: New status for the order item.
 *     responses:
 *       200:
 *         description: Order item status updated successfully
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
 *                   example: Order item status updated successfully
 *                 data:
 *                   type: object
 *                   example:
 *                     success: true
 *       400:
 *         description: Bad Request (missing or invalid fields)
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
 *                   example: Invalid status value
 *       404:
 *         description: Order item not found
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
 *                   example: Order item not found
 */

router.put(
    '/refund',
    validate(OrderValidation.updateRefundStatus),
    OrderController.updateRefundStatus
)

/**
 * @swagger
 * /api/order/orderitems:
 *   post:
 *     summary: Get all order items by status
 *     description: Retrieve a list of order items filtered by their current status. Status is provided in the request body.
 *     tags:
 *       - Order Items
 *     security:
 *       - bearerAuth: []   # If JWT authentication is used
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, shipped, delivered, cancelled]
 *                 example: shipped
 *                 description: The status of the order items to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved order items by status
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
 *                   example: Order items fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       orderId:
 *                         type: string
 *                         example: "6724d3dfd89f1b3e4a7b2341"
 *                       productId:
 *                         type: string
 *                         example: "6724d3dfd89f1b3e4a7b2359"
 *                       status:
 *                         type: string
 *                         example: "shipped"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-10-31T10:21:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-01T08:30:00.000Z"
 *       400:
 *         description: Invalid or missing status in request body
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
 *                   example: "status is required"
 */

router.post(
    '/orderitems',
    validate(OrderValidation.orderStatus),
    OrderController.getOrderedStatusItems
)

module.exports = router