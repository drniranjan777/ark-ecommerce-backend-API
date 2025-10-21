
const express = require('express')
const router = express.Router()
const validate = require('../middlewares/validate')
const {HomepageBannerValidation,CommonValidate} = require('../validations/index')
const {HomePageBannerController} = require('../controllers/index')


/**
 * @swagger
 * /api/homepagebanner:
 *   post:
 *     summary: Create a new homepage banner
 *     tags:
 *       - HomepageBanner
 *     description: Adds a new banner to the homepage.
 *     security:
 *       - bearerAuth: []  # Remove this line if authentication is not required
 *     requestBody:
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
 *                 minLength: 1
 *                 maxLength: 100
 *                 example: Autumn Sale
 *               description:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 200
 *                 example: Get up to 50% off during our autumn sale!
 *               imageUrl:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 example: https://example.com/banner.jpg
 *     responses:
 *       201:
 *         description: Banner created successfully
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
 *                   example:
 *                     _id: "652c2f2a59d1d44a1c8b4567"
 *                     title: "Autumn Sale"
 *                     description: "Get up to 50% off during our autumn sale!"
 *                     imageUrl: "https://example.com/banner.jpg"
 *       400:
 *         description: Validation error or bad request
 *       500:
 *         description: Internal server error
 */


router.post(
    '/',
    // validate(CommonValidate.objectId('couponId'),'params'),
    validate(HomepageBannerValidation.homePageBanner),
    HomePageBannerController.createHomePageBanner
)

/**
 * @swagger
 * /api/homepagebanner/{bannerId}:
 *   get:
 *     summary: Get homepage banner by ID
 *     tags:
 *       - HomepageBanner
 *     description: Retrieve a single homepage banner using its unique ID.
 *     security:
 *       - bearerAuth: []  # Remove this if no auth is needed
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the homepage banner to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved banner
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
 *                   example:
 *                     _id: "652c2f2a59d1d44a1c8b4567"
 *                     title: "Autumn Sale"
 *                     description: "Get up to 50% off during our autumn sale!"
 *                     imageUrl: "https://example.com/banner.jpg"
 *       400:
 *         description: Invalid banner ID
 *       404:
 *         description: Banner not found
 *       500:
 *         description: Internal server error
 */


router.get(
    '/:bannerId',
    validate(CommonValidate.objectId('bannerId'),'params'),
    HomePageBannerController.getHomePageBannerById
)

/**
 * @swagger
 * /api/homepagebanner/{bannerId}:
 *   put:
 *     summary: Update a homepage banner by ID
 *     tags:
 *       - HomepageBanner
 *     description: Update an existing homepage banner using its ID.
 *     security:
 *       - bearerAuth: []  # Remove this line if auth is not required
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the homepage banner to update
 *     requestBody:
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
 *                 example: Updated Autumn Sale
 *               description:
 *                 type: string
 *                 example: Now up to 60% off on select items!
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/updated-banner.jpg
 *     responses:
 *       200:
 *         description: Banner updated successfully
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
 *                   example:
 *                     _id: "652c2f2a59d1d44a1c8b4567"
 *                     title: "Updated Autumn Sale"
 *                     description: "Now up to 60% off on select items!"
 *                     imageUrl: "https://example.com/updated-banner.jpg"
 *       400:
 *         description: Validation error or invalid ID
 *       404:
 *         description: Banner not found
 *       500:
 *         description: Internal server error
 */


router.put(
    '/:bannerId',
    validate(CommonValidate.objectId('bannerId'),'params'),
    validate(HomepageBannerValidation.homePageBanner),
    HomePageBannerController.updateHomePageBanner
)

/**
 * @swagger
 * /api/homepagebanner/{bannerId}:
 *   delete:
 *     summary: Delete a homepage banner by ID
 *     tags:
 *       - HomepageBanner
 *     description: Permanently removes a homepage banner by its unique ID.
 *     security:
 *       - bearerAuth: []  # Remove if authentication is not required
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the homepage banner to delete
 *     responses:
 *       200:
 *         description: Banner deleted successfully
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
 *                   example: Banner deleted successfully
 *       400:
 *         description: Invalid banner ID
 *       404:
 *         description: Banner not found
 *       500:
 *         description: Internal server error
 */

router.delete(
    '/:bannerId',
    validate(CommonValidate.objectId('bannerId'),'params'),
    HomePageBannerController.deletedHomePageBanner
)

/**
 * @swagger
 * /api/homepagebanner:
 *   get:
 *     summary: Get homepage banner(s)
 *     tags:
 *       - HomepageBanner
 *     description: Retrieve the homepage banner data.
 *     responses:
 *       200:
 *         description: Successfully retrieved homepage banner(s)
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
 *                   example:
 *                     _id: "652c2f2a59d1d44a1c8b4567"
 *                     title: "Autumn Sale Banner"
 *                     imageUrl: "https://example.com/banner.jpg"
 *                     isActive: true
 *       400:
 *         description: Bad request – Invalid parameters
 *       404:
 *         description: Banner not found
 *       500:
 *         description: Internal server error
 */

router.get(
    '/',
    HomePageBannerController.getHomePageBanner
)

module.exports = router