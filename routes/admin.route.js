
const express = require('express')
const router = express.Router()
const {Admin} = require('../controllers/index')
const validate = require('../middlewares/validate')
const {AdminValidation} = require('../validations/index')

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
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Admin
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: admin123
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
    validate(AdminValidation.adminRegister),
    Admin.loginAdmin
)


module.exports = router