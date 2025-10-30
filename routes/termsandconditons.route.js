const express = require('express')
const router = express.Router()
const {TermsAndConditionsValidation,CommonValidate} = require('../validations/index')
const validate = require('../middlewares/validate');
const { TermsAndConditionsController } = require('../controllers/index');

/**
 * @swagger
 * /api/terms:
 *   get:
 *     summary: Get Terms & Conditions
 *     tags: [Terms & Conditions]
 *     responses:
 *       200:
 *         description: Terms & Conditions fetched successfully
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
 *                   example: Terms & Conditions fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/TermsAndConditions'
 *       404:
 *         description: Terms & Conditions not found
 */
router.get('/', TermsAndConditionsController.getTermsAndConditons);

/**
 * @swagger
 * /api/terms:
 *   post:
 *     summary: Create or update Terms & Conditions
 *     tags: [Terms & Conditions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - termsAndConditions
 *             properties:
 *               termsAndConditions:
 *                 type: string
 *                 example: These are our terms and conditions...
 *     responses:
 *       201:
 *         description: Terms & Conditions saved successfully
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
 *                   example: Terms & Conditions saved successfully
 *                 data:
 *                   $ref: '#/components/schemas/TermsAndConditions'
 *       400:
 *         description: Invalid input data
 */
router.post(
  '/',
  validate(TermsAndConditionsValidation.termsAndConditonValidate),
  TermsAndConditionsController.createTermsAndConditons
);

// /**
//  * @swagger
//  * /api/terms/{termsId}:
//  *   get:
//  *     summary: Get Terms & Conditions by ID
//  *     tags: [Terms & Conditions]
//  *     parameters:
//  *       - in: path
//  *         name: termsId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The ID of the Terms & Conditions document
//  *     responses:
//  *       200:
//  *         description: Terms & Conditions fetched successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: boolean
//  *                   example: true
//  *                 message:
//  *                   type: string
//  *                   example: Terms & Conditions fetched successfully
//  *                 data:
//  *                   $ref: '#/components/schemas/TermsAndConditions'
//  *       400:
//  *         description: Invalid Terms ID
//  *       404:
//  *         description: Terms & Conditions not found
//  */
// router.get(
//   '/:termsId',
//   validate(CommonValidate.objectId('termsId'), 'params'),
//   TermsController.getTermsAndConditionsById
// );

/**
 * @swagger
 * /api/terms/:
 *   delete:
 *     summary: Delete Terms & Conditions
 *     tags: [Terms & Conditions]
 *     responses:
 *       200:
 *         description: Terms & Conditions deleted successfully
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
 *                   example: Terms & Conditions deleted successfully
 *       404:
 *         description: Terms & Conditions not found
 *       500:
 *         description: Server error
 */

router.delete(
   '/',
  TermsAndConditionsController.deleteTermsAndConditons
);

module.exports = router;
