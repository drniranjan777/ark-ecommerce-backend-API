const express = require('express')
const router = express.Router()
const validate = require('../middlewares/validate')
const {BrandValidation,CommonValidate} = require('../validations/index')
const {BrandController} = require('../controllers/index')

/**
 * @swagger
 * /api/brand:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brand]
 *     description: This endpoint allows admin users to create a new brand with its name and image.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *                 example: "Nike"
 *                 description: Name of the brand
 *               brandImage:
 *                 type: string
 *                 example: "https://example.com/nike-logo.png"
 *                 description: URL of the brand image
 *     responses:
 *       201:
 *         description: Brand created successfully
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
 *                   example: Brand created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "672e8a5f9f13b4b9f0e4d2a1"
 *                     brandName:
 *                       type: string
 *                       example: "Nike"
 *                     brandImage:
 *                       type: string
 *                       example: "https://example.com/nike-logo.png"
 *       400:
 *         description: Validation error
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
 *                   example: "brandName and brandImage are required"
 *       409:
 *         description: Brand already exists
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
 *                   example: "Brand already exists"
 *       500:
 *         description: Internal Server Error
 */

router.post(
    '/',
    validate(BrandValidation.brandValidation),
    BrandController.createBrand
)

/**
 * @swagger
 * /api/brand:
 *   get:
 *     summary: Get all brands (with pagination)
 *     tags: [Brand]
 *     description: Retrieve a paginated list of all brands.
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
 *         description: Successfully retrieved brands
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
 *                   example: 5
 *                 totalBrands:
 *                   type: integer
 *                   example: 42
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "672e8a5f9f13b4b9f0e4d2a1"
 *                       brandName:
 *                         type: string
 *                         example: "Nike"
 *                       brandImage:
 *                         type: string
 *                         example: "https://example.com/nike-logo.png"
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
    BrandController.getBrands
)

/**
 * @swagger
 * /api/brand/{brandId}:
 *   get:
 *     summary: Get brand by ID
 *     tags: [Brand]
 *     description: Retrieve a single brand by its unique ID.
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
 *         description: Brand fetched successfully
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
 *                       example: "672e8a5f9f13b4b9f0e4d2a1"
 *                     brandName:
 *                       type: string
 *                       example: "Nike"
 *                     brandImage:
 *                       type: string
 *                       example: "https://example.com/nike-logo.png"
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

router.get(
    '/:brandId',
    validate(CommonValidate.objectId('brandId'),'params'),
    BrandController.getBrandById
)

/**
 * @swagger
 * /api/brand/{brandId}:
 *   put:
 *     summary: Update an existing brand
 *     tags: [Brand]
 *     description: Update brand details such as name or image using its unique ID.
 *     parameters:
 *       - in: path
 *         name: brandId
 *         required: true
 *         schema:
 *           type: string
 *           example: "672e8a5f9f13b4b9f0e4d2a1"
 *         description: The unique ID of the brand (MongoDB ObjectId)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               brandName:
 *                 type: string
 *                 example: "Nike Updated"
 *                 description: Updated brand name
 *               brandImage:
 *                 type: string
 *                 example: "https://example.com/nike-updated-logo.png"
 *                 description: Updated brand image URL
 *     responses:
 *       200:
 *         description: Brand updated successfully
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
 *                   example: Brand updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "672e8a5f9f13b4b9f0e4d2a1"
 *                     brandName:
 *                       type: string
 *                       example: "Nike Updated"
 *                     brandImage:
 *                       type: string
 *                       example: "https://example.com/nike-updated-logo.png"
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
 *                   example: "brandName and brandImage are required"
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
 *       409:
 *         description: Brand name already exists
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
 *                   example: "Brand already exists"
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
    '/:brandId',
    validate(CommonValidate.objectId('brandId'),'params'),
    validate(BrandValidation.brandValidation),
    BrandController.updateBrand
)


/**
 * @swagger
 * /api/brand/{brandId}:
 *   delete:
 *     summary: Delete a brand by ID
 *     tags: [Brand]
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
    BrandController.deleteBrand
)

module.exports = router