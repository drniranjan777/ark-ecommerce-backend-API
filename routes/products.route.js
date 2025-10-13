
const express = require('express')
const router = express.Router()
const {ProductController} = require('../controllers/index')
const validate = require('../middlewares/validate')
const {ProductValidation,CommonValidate} = require('../validations/index')



/**
 * @swagger
 * /api/products/{productId}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: Product fetched successfully
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
 *                   example: Product fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid product ID
 *       404:
 *         description: Product not found
 */


router.get('/:productId',
   validate(CommonValidate.objectId('productId','params')),
   ProductController.getProductById
)



/**
 * @swagger
 * /api/products/{productId}:
 *   put:
 *     summary: Update product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - sku
 *               - thumbnail
 *               - previews
 *               - price
 *               - tax
 *               - stocklevel
 *               - category
 *               - size
 *               - color
 *               - packsize
 *               - tags
 *               - metadata
 *             properties:
 *               name:
 *                 type: string
 *                 example: Premium Umbrella
 *               description:
 *                 type: string
 *                 example: A waterproof umbrella for rainy seasons.
 *               sku:
 *                 type: string
 *                 example: SKU123456
 *               thumbnail:
 *                 type: string
 *                 example: https://cdn.example.com/images/thumb.jpg
 *               previews:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - https://cdn.example.com/images/preview1.jpg
 *                   - https://cdn.example.com/images/preview2.jpg
 *               price:
 *                 type: number
 *                 example: 599.99
 *               tax:
 *                 type: number
 *                 example: 18
 *               stocklevel:
 *                 type: number
 *                 example: 100
 *               category:
 *                 type: string
 *                 example: Accessories
 *               size:
 *                 type: number
 *                 example: 42
 *               color:
 *                 type: string
 *                 example: Black
 *               packsize:
 *                 type: number
 *                 example: 1
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["rain", "monsoon", "black"]
 *               metadata:
 *                 type: string
 *                 example: '{"origin": "India", "brand": "RainGuard"}'
 *     responses:
 *       200:
 *         description: Product updated successfully
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
 *                   example: Product updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - validation error
 *       404:
 *         description: Product not found
 */
router.put('/:productId',
   validate(CommonValidate.objectId('productId','params')),
   validate(ProductValidation.productValidation),
   ProductController.updateProduct
)

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - sku
 *               - thumbnail
 *               - previews
 *               - price
 *               - tax
 *               - stocklevel
 *               - category
 *               - size
 *               - color
 *               - packsize
 *               - tags
 *               - metadata
 *             properties:
 *               name:
 *                 type: string
 *                 example: Premium Umbrella
 *               description:
 *                 type: string
 *                 example: A waterproof umbrella for rainy seasons.
 *               sku:
 *                 type: string
 *                 example: SKU123456
 *               thumbnail:
 *                 type: string
 *                 example: https://cdn.example.com/images/thumb.jpg
 *               previews:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - https://cdn.example.com/images/preview1.jpg
 *                   - https://cdn.example.com/images/preview2.jpg
 *               price:
 *                 type: number
 *                 example: 599.99
 *               tax:
 *                 type: number
 *                 example: 18
 *               stocklevel:
 *                 type: number
 *                 example: 100
 *               category:
 *                 type: string
 *                 example: Accessories
 *               size:
 *                 type: number
 *                 example: 42
 *               color:
 *                 type: string
 *                 example: Black
 *               packsize:
 *                 type: number
 *                 example: 1
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["rain", "monsoon", "black"]
 *               metadata:
 *                 type: string
 *                 example: '{"origin": "India", "brand": "RainGuard"}'
 *     responses:
 *       201:
 *         description: Product created successfully
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
 *                   example: Product Created Successfully
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - validation error
 */


router.post('/',
  validate(ProductValidation.productValidation),
  ProductController.createProduct
)

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get list of products with filters, search, sorting, and pagination
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: "Search by product name or description"
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: "Filter by product category"
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *         description: "Filter by product color"
 *       - in: query
 *         name: size
 *         schema:
 *           type: number
 *         description: "Filter by product size"
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: "Minimum price filter"
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: "Maximum price filter"
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [price, createdAt, name]
 *         description: "Field to sort by (default: createdAt)"
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: "Sort order (asc or desc)"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: "Page number for pagination"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: "Number of items per page"
 *     responses:
 *       200:
 *         description: "List of filtered products"
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
 *                   example: Products fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 125
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 13
 *                     products:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Product'
 */


router.get('/',
  ProductController.getProducts
)

/**
 * @swagger
 * /api/products/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: Product deleted successfully
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
 *                   example: Product deleted successfully
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Product not found
 *       400:
 *         description: Invalid product ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid product ID
 */


router.delete('/:productId',
  validate(CommonValidate.objectId('productId','params')),
  ProductController.deleteProduct
)

module.exports = router