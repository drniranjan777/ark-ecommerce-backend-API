const express = require('express')
const router = express.Router()
const validate = require('../middlewares/validate')
const {ColorValidation,CommonValidate} = require('../validations/index')
const {ColorController} = require('../controllers/index')

/**
 * @swagger
 * /api/color:
 *   post:
 *     summary: Create a new color
 *     tags: [Color]
 *     description: This endpoint allows admin users to create a new color with its name and HEX/RGB code.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               colorName:
 *                 type: string
 *                 example: "Red"
 *                 description: Name of the color
 *               colorCode:
 *                 type: string
 *                 example: "#FF0000"
 *                 description: HEX or RGB code for the color
 *     responses:
 *       201:
 *         description: Color created successfully
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
 *                   example: "Color created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "67308af882abc3e9d34ff920"
 *                     colorName:
 *                       type: string
 *                       example: "Red"
 *                     colorCode:
 *                       type: string
 *                       example: "#FF0000"
 *       400:
 *         description: Validation Error
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
 *                   example: "colorName and colorCode are required"
 *       409:
 *         description: Color already exists
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
 *                   example: "Color already exists"
 *       500:
 *         description: Internal Server Error
 */


router.post(
    '/',
    validate(ColorValidation.colorValidate),
    ColorController.createColor
)

/**
 * @swagger
 * /api/color:
 *   get:
 *     summary: Get all colors (with pagination)
 *     tags: [Color]
 *     description: Retrieve a paginated list of all colors.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of records per page (default is 10)
 *     responses:
 *       200:
 *         description: Successfully retrieved colors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 totalColors:
 *                   type: integer
 *                   example: 25
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "67308af882abc3e9d34ff920"
 *                       colorName:
 *                         type: string
 *                         example: "Red"
 *                       colorCode:
 *                         type: string
 *                         example: "#FF0000"
 *       500:
 *         description: Internal Server Error
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
 *                   example: Internal Server Error
 */


router.get(
    '/',
    ColorController.getColors
)

/**
 * @swagger
 * /api/color/{colorId}:
 *   get:
 *     summary: Get color by ID
 *     tags: [Color]
 *     description: Retrieve a single color by its unique ID.
 *     parameters:
 *       - in: path
 *         name: colorId
 *         required: true
 *         schema:
 *           type: string
 *           example: "67308af882abc3e9d34ff920"
 *         description: The unique ID of the color (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Color fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "67308af882abc3e9d34ff920"
 *                     colorName:
 *                       type: string
 *                       example: "Red"
 *                     colorCode:
 *                       type: string
 *                       example: "#FF0000"
 *       400:
 *         description: Invalid colorId format (validation error)
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
 *                   example: "Invalid colorId format"
 *       404:
 *         description: Color not found
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
 *                   example: "Color not found"
 *       500:
 *         description: Internal Server Error
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
 *                   example: "Internal Server Error"
 */


router.get(
    '/:colorId',
    validate(CommonValidate.objectId('colorId'),'params'),
    ColorController.getColorById
);

/**
 * @swagger
 * /api/color/{colorId}:
 *   put:
 *     summary: Update an existing color
 *     tags: [Color]
 *     description: Update color details such as name or hex code using its unique ID.
 *     parameters:
 *       - in: path
 *         name: colorId
 *         required: true
 *         schema:
 *           type: string
 *           example: "67308af882abc3e9d34ff920"
 *         description: The unique ID of the color (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               colorName:
 *                 type: string
 *                 example: "Sky Blue"
 *                 description: Updated color name
 *               colorCode:
 *                 type: string
 *                 example: "#87CEEB"
 *                 description: Updated HEX color code
 *     responses:
 *       200:
 *         description: Color updated successfully
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
 *                   example: Color updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "67308af882abc3e9d34ff920"
 *                     colorName:
 *                       type: string
 *                       example: "Sky Blue"
 *                     colorCode:
 *                       type: string
 *                       example: "#87CEEB"
 *       400:
 *         description: Validation error (invalid input data)
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
 *                   example: "colorName and colorCode are required"
 *       404:
 *         description: Color not found
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
 *                   example: "Color not found"
 *       409:
 *         description: Color name already exists
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
 *                   example: "Color already exists"
 *       500:
 *         description: Internal Server Error
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
 *                   example: "Internal Server Error"
 */

router.put(
    '/:colorId',
    validate(CommonValidate.objectId('colorId'), 'params'),
    validate(ColorValidation.colorValidate),
    ColorController.updateColor
);


/**
 * @swagger
 * /api/color/{brandId}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Color]
 *     description: Permanently delete a brand using its unique ID.
 *     parameters:
 *       - in: path
 *         name: brandId
 *         required: true
 *         schema:
 *           type: string
 *           example: "672e8a5f9f13b4b9f0e4d2a1"
 *         description: The unique ID of the brand (MongoDB ObjectId)
 *     responses:
 *       200:
 *         description: Brand deleted successfully
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
 *                   example: Brand deleted successfully
 *       400:
 *         description: Invalid brandId format (validation error)
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
 *                   example: "Invalid brandId format"
 *       404:
 *         description: Brand not found
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
 *                   example: "Brand not found"
 *       500:
 *         description: Internal Server Error
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
 *                   example: "Internal Server Error"
 */


router.delete(
    '/:brandId',
    validate(CommonValidate.objectId('brandId'),'params'),
    ColorController.deleteColor
)

module.exports = router