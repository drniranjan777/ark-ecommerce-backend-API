const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = '1d';

const findByEmail =async(email) => {
  return await Admin.findOne({ email });
}

const verifyPassword = async (admin, plainPassword) => {
  return await bcrypt.compare(plainPassword, admin.password);
}

const adminRegister = async (req) => {
  const { email, password } = req.body;

  // Check if user already exists
  const existingUser = await Admin.findOne({ email });
  if (existingUser) {
    throw new AppError('Admin already exists', 400);
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new admin
  const newAdmin = await Admin.create({
    email,
    password: hashedPassword,
  });

  return newAdmin;
};


const loginAdmin = async(req, res) => {
    const { email, password } = req.body;


    const admin = await findByEmail(email);

    if (!admin) {
      throw new AppError('Invalid email or password',400);
    }

    const isPasswordValid = await verifyPassword(admin, password);
    if (!isPasswordValid) {
       throw new AppError('Password not correct',400);
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return {token,payload};
 
}


module.exports = {
  adminRegister,
  loginAdmin
};
