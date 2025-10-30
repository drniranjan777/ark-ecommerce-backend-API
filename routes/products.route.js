
const express = require('express')
const router = express.Router()
const {ProductController} = require('../controllers/index')
const validate = require('../middlewares/validate')
const {ProductValidation,CommonValidate} = require('../validations/index')
const userAuth = require("../middlewares/userAuth")


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
   validate(CommonValidate.objectId('productId'),'params'),
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
   validate(CommonValidate.objectId('productId'),'params'),
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
 *         name: brand
 *         schema:
 *           type: string
 *         description: "Filter by product brand"
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
  validate(CommonValidate.objectId('productId'),'params'),
  ProductController.deleteProduct
)

/**
 * @swagger
 * /api/products/review:
 *   post:
 *     summary: Submit a review for a product
 *     tags: 
 *       - Products review
 *     description: Allows a user to submit a product review with rating and comment.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductReviewInput'
 *           example:
 *             product: "652d1af7a118f0b6f0c3a7c9"
 *             rating: 5
 *             review: "Amazing quality and delivery speed!"
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductReview'
 *       400:
 *         description: Bad request – validation error
 *       500:
 *         description: Internal server error
 */



router.post('/review',
   userAuth,
   validate(ProductValidation.productReviewValidation),
   ProductController.createProductReview
)

/**
 * @swagger
 * /api/products/review/{reviewId}:
 *   get:
 *     summary: Get a specific product review by ID
 *     tags:
 *       - Products review
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 24
 *           maxLength: 24
 *         description: The ID of the review to retrieve
 *     responses:
 *       200:
 *         description: Review retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductReview'
 *       400:
 *         description: Invalid review ID
 *       401:
 *         description: Unauthorized – JWT token missing or invalid
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */


router.get('/review/:reviewId',
   userAuth,
   validate(CommonValidate.objectId('reviewId'),'params'),
   ProductController.getProductReviewById
)

/**
 * @swagger
 * /api/products/review/{reviewId}:
 *   put:
 *     summary: Update an existing product review
 *     tags:
 *       - Products review
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         description: ID of the review to update
 *         schema:
 *           type: string
 *           example: 652d1af7a118f0b6f0c3a7c9
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductReviewInput'
 *           example:
 *             product: 652d1af7a118f0b6f0c3a7a1
 *             rating: 4
 *             review: "Updated review text goes here"
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductReview'
 *       400:
 *         description: Bad request – invalid input
 *       401:
 *         description: Unauthorized – user not logged in
 *       403:
 *         description: Forbidden – user not owner of review
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */


router.put('/review/:reviewId',
   userAuth,
   validate(CommonValidate.objectId('reviewId'),'params'),
   validate(ProductValidation.productReviewValidation),
   ProductController.updateProductReview
)

/**
 * @swagger
 * /api/products/review/{reviewId}:
 *   delete:
 *     summary: Delete a product review
 *     tags:
 *       - Products review
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         description: The ID of the review to delete
 *         schema:
 *           type: string
 *           example: 652d1af7a118f0b6f0c3a7c9
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review deleted successfull
 *       400:
 *         description: Invalid review ID
 *       401:
 *         description: Unauthorized — user not logged in
 *       403:
 *         description: Forbidden — user does not own the review
 *       404:
 *         description: Review not found
 *       500:
 *         description: Internal server error
 */


router.delete('/review/:reviewId',
   userAuth,
   validate(CommonValidate.objectId('reviewId'),'params'),
   validate(ProductValidation.productReviewValidation),
   ProductController.deleteProductReview
)


/**
 * @swagger
 * /api/products/review/product/{reviewId}:
 *   get:
 *     summary: Get all reviews for a specific product
 *     tags:
 *       - Products review
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         description: The ID of the product to fetch reviews for
 *         schema:
 *           type: string
 *           example: 652d1af7a118f0b6f0c3a7c9
 *     responses:
 *       200:
 *         description: List of product reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ProductReview'
 *       400:
 *         description: Invalid product ID
 *       401:
 *         description: Unauthorized — user not logged in
 *       404:
 *         description: No reviews found for this product
 *       500:
 *         description: Internal server error
 */


router.get('/review/product/:reviewId',
   validate(CommonValidate.objectId('reviewId'),'params'),
   ProductController.getProductReviews
)

/**
 * @swagger
 * /api/products/size/product:
 *   get:
 *     summary: Get all product sizes
 *     description: Retrieves a list of all available product sizes.
 *     tags:
 *       - Products size
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all product sizes retrieved successfully
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
 *                   example: Product sizes fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6700b8ef2f1b7b0012a345cd"
 *                       size:
 *                         type: string
 *                         example: "Medium"
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */


router.get('/size/product',
   ProductController.getAllProductSizes
)


/**
 * @swagger
 * /api/products/size:
 *   post:
 *     summary: Create a new product size
 *     description: Adds a new product size (e.g., Small, Medium, Large)
 *     tags:
 *       - Products size
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - size
 *             properties:
 *               size:
 *                 type: string
 *                 description: The size label for the product
 *                 example: "Medium"
 *     responses:
 *       201:
 *         description: Product size created successfully
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
 *                   example: Product size added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6700b8ef2f1b7b0012a345cd"
 *                     size:
 *                       type: string
 *                       example: "Medium"
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */


router.post('/size',

   // validate(CommonValidate.objectId('reviewId'),'params'),
   validate(ProductValidation.productSize),
   ProductController.createProductSize
)



/**
 * @swagger
 * /api/products/size/{sizeId}:
 *   get:
 *     summary: Get product size by ID
 *     description: Retrieves details of a specific product size using its unique ID.
 *     tags:
 *       - Products size
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sizeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the product size to retrieve
 *         example: "6700b8ef2f1b7b0012a345cd"
 *     responses:
 *       200:
 *         description: Product size fetched successfully
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
 *                   example: Product size fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6700b8ef2f1b7b0012a345cd"
 *                     size:
 *                       type: string
 *                       example: "Medium"
 *       400:
 *         description: Invalid size ID
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       404:
 *         description: Product size not found
 *       500:
 *         description: Internal server error
 */


router.get('/size/:sizeId',
   validate(CommonValidate.objectId('sizeId'),'params'),
   ProductController.getProductSizeById
)

/**
 * @swagger
 * /api/products/size/{sizeId}:
 *   put:
 *     summary: Update product size by ID
 *     description: Updates the size value of an existing product size using its unique ID.
 *     tags:
 *       - Products size
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sizeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the product size to update
 *         example: "6700b8ef2f1b7b0012a345cd"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - size
 *             properties:
 *               size:
 *                 type: string
 *                 description: The new size name to update
 *                 example: "Large"
 *     responses:
 *       200:
 *         description: Product size updated successfully
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
 *                   example: Product size updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "6700b8ef2f1b7b0012a345cd"
 *                     size:
 *                       type: string
 *                       example: "Large"
 *       400:
 *         description: Invalid request data or size ID
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       404:
 *         description: Product size not found
 *       500:
 *         description: Internal server error
 */


router.put('/size/:sizeId',
   validate(CommonValidate.objectId('sizeId'),'params'),
   validate(ProductValidation.productSize),
   ProductController.updateProductSize
)

/**
 * @swagger
 * /api/products/size/{sizeId}:
 *   delete:
 *     summary: Delete product size by ID
 *     description: Deletes a specific product size using its unique ID.
 *     tags:
 *       - Products size
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sizeId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the product size to delete
 *         example: "6700b8ef2f1b7b0012a345cd"
 *     responses:
 *       200:
 *         description: Product size deleted successfully
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
 *                   example: Product size deleted successfully
 *       400:
 *         description: Invalid size ID
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       404:
 *         description: Product size not found
 *       500:
 *         description: Internal server error
 */


router.delete('/size/:sizeId',
   validate(CommonValidate.objectId),
   ProductController.deleteProductSize
)




module.exports = router