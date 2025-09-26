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
    validate(AdminValidation.adminRegister),
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
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
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
 */

// Get all users
router.get('/', UserController.getAllUsers);

module.exports = router