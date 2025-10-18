const express = require('express')
const router = express.Router()
const {WihslistController} = require("../controllers/index")
const validate = require('../middlewares/validate')
const {WishlistValidation} = require('../validations/index')
const userAuth = require('../middlewares/userAuth')


/**
 * @swagger
 * /api/wishlist/add:
 *   post:
 *     summary: Add item to user's wishlist
 *     tags: [Wishlist]
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
 *     responses:
 *       200:
 *         description: Item added to wishlist successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Item added to wishlist
 *                 item:
 *                   $ref: '#/components/schemas/WishlistItem'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized (no token or invalid)
 *       500:
 *         description: Server error
 */


router.post('/add',
 userAuth,
 validate(WishlistValidation.wishlistValidation),
 WihslistController.addItemToWishlist
)



/**
 * @swagger
 * /api/wishlist/remove:
 *   delete:
 *     summary: Remove a specific product from the user's wishlist
 *     tags: [Wishlist]
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
 *         description: Product removed from wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product removed from wishlist
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Product not found in wishlist
 *       500:
 *         description: Server error
 */


router.delete('/remove',
  userAuth,
  validate(WishlistValidation.wishlistValidation),
  WihslistController.removeItemFromWishlist
);

/**
 * @swagger
 * /api/wishlist/clear:
 *   delete:
 *     summary: Clear all items from the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wishlist cleared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Wishlist cleared
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */


router.delete('/clear',
  userAuth,
  WihslistController.clearWishlist
);

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Get all items from the user's wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of wishlist items
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
  WihslistController.getUserWishlistItems
);

module.exports = router