const express = require('express')
const router = express.Router()
const {CartController} = require("../controllers/index")
const validate = require('../middlewares/validate')
const {CartValidation} = require('../validations/index')
const userAuth = require('../middlewares/userAuth')
const { cartValidation } = require('../validations/cart.validation')

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add item to user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 description: The ID of the product (MongoDB ObjectId)
 *                 example: "60f7f0dcd5e4c123456789ab"
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 description: Quantity of the product to add
 *                 example: 2
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item added to cart
 *                 item:
 *                   $ref: '#/components/schemas/CartItem'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (no token or invalid)
 *       500:
 *         description: Server error
 */


router.post('/add',
 userAuth,
 validate(CartValidation.cartValidation),
 CartController.addItemToCart
)

/**
 * @swagger
 * /api/cart/update:
 *   put:
 *     summary: Update quantity of a product in the user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []   # If you use bearer token auth (JWT)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to update
 *                 example: "64f9b26c8fa5f3a5b5d3e6c1"
 *               quantity:
 *                 type: integer
 *                 description: Quantity to add or subtract (can be positive or negative)
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cart item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cartItem:
 *                   type: object
 *                   description: Updated cart item
 *                   properties:
 *                     _id:
 *                       type: string
 *                     cartId:
 *                       type: string
 *                     productId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     priceAtAdd:
 *                       type: number
 *                     addedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - user authentication failed
 *       404:
 *         description: Cart or cart item not found
 *       500:
 *         description: Internal server error
 */
router.put('/update',
  userAuth,
  validate(CartValidation.cartValidation),
  CartController.updateCart
);

/**
 * @swagger
 * /api/cart/remove:
 *   delete:
 *     summary: Remove a specific product from the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID of the product to remove (MongoDB ObjectId)
 *                 example: "652f3c5be763bc8a2c7e45f1"
 *     responses:
 *       200:
 *         description: Product removed from cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product removed from cart
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in cart
 *       500:
 *         description: Server error
 */


router.delete('/remove',
  userAuth,
  validate(CartValidation.removeFromCartSchema),
  CartController.removeItemFromCart
);

/**
 * @swagger
 * /api/cart/clear:
 *   delete:
 *     summary: Clear all items from the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cart cleared
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */


router.delete('/clear',
  userAuth,
  CartController.clearCart
);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all items from the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                     example: 652c4a25abf5a2e4d9fce123
 *                   name:
 *                     type: string
 *                     example: Running Shoes
 *                   quantity:
 *                     type: integer
 *                     example: 2
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 59.99
 *                   image:
 *                     type: string
 *                     example: https://cdn.example.com/images/shoe.jpg
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

router.get('/',
  userAuth,
  CartController.getUserCartItems
);

module.exports = router