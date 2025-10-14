// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const {UploadController} = require('../controllers/index')


/**
 * @swagger
 * tags:
 *   - name: Uploads
 *     description: Image upload APIs
 * 
 * /api/upload/single:
 *   post:
 *     summary: Upload a single image
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
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
 *                   example: Image uploaded successfully
 *                 url:
 *                   type: string
 *                   example: http://localhost:3000/uploads/image-1697283945233-123456.jpg
 *       400:
 *         description: No image uploaded or invalid file type
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
 *                   example: No image uploaded
 * 
 * /api/upload/multiple:
 *   post:
 *     summary: Upload multiple images (up to 5)
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: The images files to upload
 *     responses:
 *       200:
 *         description: Images uploaded successfully
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
 *                   example: Images uploaded successfully
 *                 urls:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - http://localhost:3000/uploads/images-1.jpg
 *                     - http://localhost:3000/uploads/images-2.jpg
 *       400:
 *         description: No images uploaded or invalid files
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
 *                   example: No images uploaded
 */


// Single image upload
router.post('/single', upload.single('image'),UploadController.uploadSingleImage);

// Multiple images upload (up to 5)
router.post('/multiple', upload.array('images', 5),UploadController.uploadMultipleImage);

module.exports = router;
