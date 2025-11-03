const express = require('express')
const router = express.Router()
const validate = require('../middlewares/validate')
const {BlogController} = require("../controllers/index")
const {BlogValidation,CommonValidate} = require('../validations/index')


/**
 * @swagger
 * /api/blog:
 *   post:
 *     summary: Create a new blog post
 *     description: Creates a new blog entry with optional image URL.
 *     tags:
 *       - Blogs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My first blog post"
 *               description:
 *                  type: string
 *                  example: "Test description"
 *               imageUrl:
 *                 type: string
 *                 example: "https://example.com/images/myimage.jpg"
 *     responses:
 *       201:
 *         description: Blog created successfully
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
 *                   example: Blog created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64bcae9a87f1b23cd90123ab
 *                     blog:
 *                       type: string
 *                       example: "My first blog post"
 *                     imageUrl:
 *                       type: string
 *                       example: "https://example.com/images/myimage.jpg"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Validation error or bad request
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
 *                   example: "Validation failed"
 */
router.post(
  '/',
  validate(BlogValidation.blogValidate),
  BlogController.createBlog
);


/**
 * @swagger
 * /api/blog:
 *   get:
 *     summary: Get all blogs with pagination
 *     description: Fetch a paginated list of blogs. Supports optional search and sorting.
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *           minimum: 1
 *         required: false
 *         description: Page number (defaults to 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *           minimum: 1
 *         required: false
 *         description: Number of items per page (defaults to 10)
 *     responses:
 *       200:
 *         description: Paginated list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 25
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64a9f5a3e234d1b9c8c5e7b1"
 *                       blog:
 *                         type: string
 *                         example: "How to use Swagger in Node.js"
 *                       imageUrl:
 *                         type: string
 *                         example: "https://example.com/uploads/image.png"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-03T08:15:30.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-03T08:15:30.000Z"
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */


router.get(
  '/',
//   validate(CommonValidate.queryValidate,'query'),
  BlogController.getAllBlogs
);

/**
 * @swagger
 * /api/blog/{blogId}:
 *   get:
 *     summary: Get a single blog by ID
 *     description: Fetch the details of a blog using its unique ID.
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the blog to retrieve
 *     responses:
 *       200:
 *         description: Blog retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 blog:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *       400:
 *         description: Invalid blog ID supplied
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */

router.get(
  '/:blogId',
  validate(CommonValidate.objectId('blogId'),'params'),
  BlogController.getBlogById
);

/**
 * @swagger
 * /api/blog/{blogId}:
 *   put:
 *     summary: Update a blog by ID
 *     description: Update the details of a blog. Validates the blogId parameter and request body.
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: The ID of the blog to update
 *         schema:
 *           type: string
 *           example: 64f0b9a3c2a1b2d3e4f5g6h
 *     requestBody:
 *       description: Blog fields to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - imageUrl
 *             properties:
 *               title:
 *                 type: string
 *                 description: Blog title
 *                 example: "My Updated Blog Title"
 *               description:
 *                 type: string
 *                 description: Blog description
 *                 example: "This is the updated blog description."
 *               imageUrl:
 *                 type: string
 *                 description: Blog image URL
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Blog updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 64f0b9a3c2a1b2d3e4f5g6h
 *                     title:
 *                       type: string
 *                       example: "My Updated Blog Title"
 *                     description:
 *                       type: string
 *                       example: "This is the updated blog description."
 *                     imageUrl:
 *                       type: string
 *                       example: "https://example.com/image.jpg"
 *       400:
 *         description: Invalid blogId or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid blogId format
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Blog not found
 */

router.put(
  '/:blogId',
  validate(CommonValidate.objectId('blogId'),'params'),
  validate(BlogValidation.blogValidate),
  BlogController.updateBlog
);

/**
 * @swagger
 * /api/blog/{blogId}:
 *   delete:
 *     summary: Delete a blog by ID
 *     description: Deletes a blog from the database using its ID.
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: The ID of the blog to delete
 *         schema:
 *           type: string
 *           example: 64f0b9a3c2a1b2d3e4f5g6h
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Blog deleted successfully
 *       400:
 *         description: Invalid blogId format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Invalid blogId format
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: Blog not found
 */


router.delete(
  '/:blogId',
  validate(CommonValidate.objectId('blogId'),'params'),
  BlogController.deleteBlog
)


module.exports = router