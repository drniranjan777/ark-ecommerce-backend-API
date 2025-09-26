const { UserService } = require('../services/index');
const catchAsync = require('../utils/catchAsync');


//register user
const registerUser = catchAsync(async (req, res) => {
  const user = await UserService.userRegister(req);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: user
  });
});


//login user
const loginUser = catchAsync(async (req, res) => {
  const user = await UserService.loginUser(req);

  res.status(200).json({
    success: true,
    message: 'User login successfully',
    user: user.payload,
    token: user.token,
  });
});


// Update user
const updateUser = catchAsync(async (req, res) => {
  const user = await UserService.updateUser(req);

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: user,
  });
});

// Delete user
const deleteUser = catchAsync(async (req, res) => {
  const user = await UserService.deleteUser(req);

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: user,
  });
});

// Get all users
const getAllUsers = catchAsync(async (req, res) => {
  const users = await UserService.getAllUsers();

  res.status(200).json({
    success: true,
    message: 'Users fetched successfully',
    data: users,
  });
});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers
};
