const User = require('../models/user');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = '1d';

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const verifyPassword = async (user, plainPassword) => {
  return await bcrypt.compare(plainPassword, user.password);
};


//user register service
const userRegister = async (req) => {
  const { email, password, name, mobileNumber, status } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User already exists', 400);
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = await User.create({
    email,
    password: hashedPassword,
    name,
    mobileNumber,
    status: status || 'active',  // default status if not provided
  });

  return newUser;
};


//user login service
const loginUser = async (req) => {
  const { email, password } = req.body;

  const user = await findByEmail(email);

  if (!user) {
    throw new AppError('Invalid email or password', 400);
  }

  const isPasswordValid = await verifyPassword(user, password);
  if (!isPasswordValid) {
    throw new AppError('Password not correct', 400);
  }

  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    status: user.status,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return { token, payload };
};

//update user

const updateUser = async (req) => {
  const { id } = req.params;
  const updateData = req.body;

  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) {
    throw new AppError('User not found', 404);
  }

  return updatedUser;
};


//delete user

const deleteUser = async (req) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

//get all users
const getAllUsers = async () => {
  return await User.find().select('-password'); // hide password
};

module.exports = {
  userRegister,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers
};
