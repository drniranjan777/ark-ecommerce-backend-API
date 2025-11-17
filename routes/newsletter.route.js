const express = require('express');
const router = express.Router();
const validate = require('../middlewares/validate');
const { NewsletterValidation, CommonValidate } = require('../validations/index');
const { NewsletterController } = require('../controllers/index');

/**
 * @swagger
 * /api/newsletter:
 *   post:
 *     summary: Subscribe to newsletter
 *     tags: [Newsletter]
 *     description: Add an email to the newsletter subscription list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *                 description: Email address to subscribe
 *     responses:
 *       201:
 *         description: Successfully subscribed
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
 *                   example: "Subscribed to newsletter successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "651e8a5f9f13b4b9f0e4d2a1"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 */

router.post(
  '/',
  validate(NewsletterValidation.newsLetterValidation),
  NewsletterController.createNewsletter
);

/**
 * @swagger
 * /api/newsletter:
 *   get:
 *     summary: Get all newsletter subscribers (with pagination)
 *     tags: [Newsletter]
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
 *         description: Successfully retrieved subscribers
 */

router.get(
  '/',
  NewsletterController.getNewsletters
);

/**
 * @swagger
 * /api/newsletter/{id}:
 *   get:
 *     summary: Get subscriber by ID
 *     tags: [Newsletter]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "651e8a5f9f13b4b9f0e4d2a1"
 *         description: Subscriber unique ID
 *     responses:
 *       200:
 *         description: Subscriber fetched successfully
 */

router.get(
  '/:id',
  validate(CommonValidate.objectId('id'), 'params'),
  NewsletterController.getNewsletterById
);

/**
 * @swagger
 * /api/newsletter/{id}:
 *   put:
 *     summary: Update subscriber email
 *     tags: [Newsletter]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "651e8a5f9f13b4b9f0e4d2a1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "newemail@example.com"
 *     responses:
 *       200:
 *         description: Subscriber updated successfully
 */

router.put(
  '/:id',
  validate(CommonValidate.objectId('id'), 'params'),
  validate(NewsletterValidation.newsLetterValidation),
  NewsletterController.updateNewsletter
);

/**
 * @swagger
 * /api/newsletter/{id}:
 *   delete:
 *     summary: Delete subscriber by ID
 *     tags: [Newsletter]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "651e8a5f9f13b4b9f0e4d2a1"
 *     responses:
 *       200:
 *         description: Subscriber deleted successfully
 */

router.delete(
  '/:id',
  validate(CommonValidate.objectId('id'), 'params'),
  NewsletterController.deleteNewsletter
);



/**
 * @swagger
 * /api/newsletter/send:
 *   post:
 *     summary: Send newsletter to all subscribers
 *     tags: [Newsletter]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *                 example: "Our Latest Updates"
 *               message:
 *                 type: string
 *                 example: "<h1>New Products Available!</h1>"
 */
router.post('/send', NewsletterController.sendNewsletter);

module.exports = router;
