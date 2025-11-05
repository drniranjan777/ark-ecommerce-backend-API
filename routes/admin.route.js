
const express = require('express')
const router = express.Router()
const {Admin} = require('../controllers/index')
const validate = require('../middlewares/validate')
const {AdminValidation,CommonValidate} = require('../validations/index')
const adminAuth = require('../middlewares/adminAuth')

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Admin Register
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - adminType
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: admin123
 *               adminType:
 *                 type: string
 *                 enum: [superadmin, manager, support]
 *                 example: manager
 *                 description: Type of admin user (role-based access)
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Validation error or bad request
 */


router.post('/register',
    validate(AdminValidation.adminRegister),
    Admin.registerAdmin
)


/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin Login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

router.post('/login',
    validate(AdminValidation.adminLogin),
    Admin.loginAdmin
)

/**
 * @swagger
 * /api/admin/update:
 *   put:
 *     summary: Update Admin Details
 *     tags: [Admin]
 *     description: Update existing admin information such as name, email, adminType, or status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adminId:
 *                 type: string
 *                 example: 652f39e98c27ab3458ef1234
 *               status:
 *                 type: boolean
 *                 example: true
 *             required:
 *               - adminId
 *     responses:
 *       200:
 *         description: Admin updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */

router.put('/update',
    adminAuth,
    validate(AdminValidation.updateAdmin),
    Admin.updateAdminStatus
)

/**
 * @swagger
 * /api/admin/{adminId}:
 *   delete:
 *     summary: Delete an admin by ID
 *     tags: [Admin]
 *     description: Permanently deletes an admin account using its MongoDB ObjectId.
 *     security:
 *       - bearerAuth: []   # if JWT auth is used via adminAuth middleware
 *     parameters:
 *       - in: path
 *         name: adminId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *         description: The unique MongoDB ObjectId of the admin to delete
 *         example: 652f39e98c27ab3458ef1234
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin deleted successfully
 *       400:
 *         description: Invalid adminId format
 *       401:
 *         description: Unauthorized or invalid token
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */

router.delete('/:adminId',
    adminAuth,
    validate(CommonValidate.objectId('adminId'),'adminId'),
    Admin.deleteAdmin
)

/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Get all admins (with pagination and filters)
 *     tags: [Admin]
 *     description: Retrieve a paginated list of admins. Supports filtering by adminType and status.
 *     security:
 *       - bearerAuth: []   # Uses JWT token via adminAuth middleware
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: Admin list fetched successfully
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
 *                 totalAdmins:
 *                   type: integer
 *                   example: 50
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 652f39e98c27ab3458ef1234
 *                       name:
 *                         type: string
 *                         example: Ravi Kumar
 *                       email:
 *                         type: string
 *                         example: ravi@example.com
 *                       adminType:
 *                         type: string
 *                         example: manager
 *                       status:
 *                         type: boolean
 *                         example: true
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       500:
 *         description: Internal server error
 */


router.get('/',
    adminAuth,
    Admin.getAdmins
)

/**
 * @swagger
 * /api/admin/forget-password:
 *   post:
 *     summary: Send a password reset email to the user
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - resetLink
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               resetLink:
 *                 type: string
 *                 format: uri
 *                 example: "https://yourdomain.com/reset-password?token=abcdef123456"
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset email sent"
 *       400:
 *         description: Invalid request or user not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 */



router.post('/forget-password', Admin.forgetPasswordAdmin);

/**
 * @swagger
 * /api/admin/reset-password:
 *   post:
 *     summary: Reset user password using a reset token
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 description: The password reset token sent to the user's email
 *                 example: "d1f5c8e9b2a3..."
 *               newPassword:
 *                 type: string
 *                 description: The new password to set for the user
 *                 example: "MyNewPassword123!"
 *     responses:
 *       200:
 *         description: Password successfully reset
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset successfully"
 *       400:
 *         description: Invalid token or request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or expired token"
 */


router.post('/reset-password',Admin.resetPasswordAdmin);

module.exports = router