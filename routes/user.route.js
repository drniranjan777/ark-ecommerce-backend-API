const express = require('express')
const router = express.Router()
const {UserController} = require('../controllers/index')
const validate = require('../middlewares/validate')
const {UserValidation,AdminValidation} = require('../validations/index')

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: User Registration
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - mobileNumber
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *               name:
 *                 type: string
 *                 example: John Doe
 *               mobileNumber:
 *                 type: integer
 *                 example: 9876543210
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error or user already exists
 */

router.post('/register',
    validate(UserValidation.userRegister),
    UserController.registerUser
)

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User Login
 *     tags: [User]
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
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
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
 *                   example: User login successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 6123456789abcdef12345678
 *                     email:
 *                       type: string
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Validation error or invalid credentials
 */

router.post('/login',
    validate(UserValidation.userLogin),
    UserController.loginUser
)

/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: updated@example.com
 *               name:
 *                 type: string
 *                 example: Updated Name
 *               mobileNumber:
 *                 type: integer
 *                 example: 9999999999
 *               status:
 *                 type: string
 *                 enum: [active, block]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */

// Update user
router.put('/:id', UserController.updateUser);


/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

// Delete user
router.delete('/:id', UserController.deleteUser);


/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users with pagination
 *     tags: [User]
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
 *         description: Number of users per page
 *     responses:
 *       200:
 *         description: A list of users with pagination info
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
 *                   example: Users fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 6123456789abcdef12345678
 *                       email:
 *                         type: string
 *                         example: user@example.com
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       mobileNumber:
 *                         type: integer
 *                         example: 9876543210
 *                       status:
 *                         type: string
 *                         enum: [active, block]
 *                 total:
 *                   type: integer
 *                   example: 100
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 10
 */


// Get all users
router.get('/', UserController.getAllUsers);


/**
 * @swagger
 * /api/user/forget-password:
 *   post:
 *     summary: Send a password reset email to the user
 *     tags: [User]
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



router.post('/forget-password', UserController.forgetPassword);

/**
 * @swagger
 * /api/user/reset-password:
 *   post:
 *     summary: Reset user password using a reset token
 *     tags: [User]
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


router.post('/reset-password', UserController.resetPassword);


/**
 * @swagger
 * /api/user/otp-login:
 *   post:
 *     summary: Send OTP to user's mobile number for login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobileNumber
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 description: User's mobile number to receive the OTP
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP sent successfully"
 *       400:
 *         description: Invalid request or mobile number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid mobile number"
 */

router.post('/otp-login', UserController.sendOtp);


/**
 * @swagger
 * /api/user/verify-otp:
 *   post:
 *     summary: Verify OTP for user's mobile number and login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobileNumber
 *               - otp
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 description: User's mobile number used to receive the OTP
 *                 example: "9876543210"
 *               otp:
 *                 type: number
 *                 description: OTP received on the user's mobile
 *                 example: 123456
 *     responses:
 *       200:
 *         description: OTP verified successfully and JWT returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP verified successfully"
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user
 *                 payload:
 *                   type: object
 *                   description: User details included in the token
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "64f8d8b2a3e2b12c3456789a"
 *                     mobileNumber:
 *                       type: string
 *                       example: "9876543210"
 *                     status:
 *                       type: string
 *                       example: "active"
 *       400:
 *         description: Invalid OTP or request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid OTP or session expired"
 */

router.post('/verify-otp', UserController.verifyOtp);


module.exports = router