const express = require('express');
const router = express.Router();
const {AboutController} = require('../controllers/index');
const validate = require('../middlewares/validate');
const {AboutValidation,CartValidation, CommonValidate} = require('../validations/index');

/**
 * @swagger
 * /api/about:
 *   get:
 *     summary: Get About page content
 *     tags: [About]
 *     responses:
 *       200:
 *         description: About page fetched successfully
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
 *                   example: About page fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     aboutPage:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 */
router.get('/', AboutController.getAbout);

/**
 * @swagger
 * /api/about:
 *   post:
 *     summary: Create or update About page
 *     tags: [About]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - aboutPage
 *             properties:
 *               aboutPage:
 *                 type: string
 *                 example: Welcome to our store! We offer high-quality products.
 *     responses:
 *       201:
 *         description: About page created/updated successfully
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
 *                   example: About page created/updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     aboutPage:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 */
router.post('/', validate(AboutValidation), AboutController.createAbout);

/**
 * @swagger
 * /api/about/{aboutId}:
 *   put:
 *     summary: Update About page by ID
 *     tags: [About]
 *     parameters:
 *       - in: path
 *         name: aboutId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the About page
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - aboutPage
 *             properties:
 *               aboutPage:
 *                 type: string
 *                 example: Updated About page content.
 *     responses:
 *       200:
 *         description: About page updated successfully
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
 *                   example: About page updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     aboutPage:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 */
router.put('/:aboutId',validate(CommonValidate.objectId('aboutId'),'params'), validate(AboutValidation), AboutController.updateAbout);

/**
 * @swagger
 * /api/about/{aboutId}:
 *   delete:
 *     summary: Delete About page by ID
 *     tags: [About]
 *     parameters:
 *       - in: path
 *         name: aboutId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the About page to delete
 *     responses:
 *       200:
 *         description: About page deleted successfully
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
 *                   example: About page deleted successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     aboutPage:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 */
router.delete('/:aboutId', AboutController.deleteAbout);

module.exports = router;
