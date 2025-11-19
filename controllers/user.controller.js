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
  const users = await UserService.getAllUsers(req);

  res.status(200).json({
    success: true,
    message: 'Users fetched successfully',
    data: users,
  });
});

// forget password
const forgetPassword = catchAsync(async (req, res) => {
  const users = await UserService.forgotPasswordService(req);

  res.status(200).json({
    success: true,
    message: 'Password reset link sent to email',
    data: users,
  });
})

// reset password
const resetPassword = catchAsync(async (req, res) => {
  const result = await UserService.resetPasswordService(req);

  res.status(200).json({
    success: true,
    message: 'Reset password successfull',
    data: result,
  });
})

// send otp to mobile number
const sendOtp= catchAsync(async (req, res) => {
  const result = await UserService.sendOtp(req);

  res.status(200).json({
    success: true,
    message: 'Otp sent successfull',
    data: result,
  });
})

// verify otp
const verifyOtp= catchAsync(async (req, res) => {
  const result = await UserService.verifyOtpService(req);

  res.status(200).json({
    success: true,
    message: 'Otp verified successfull',
    data: result,
  });
})

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,

  forgetPassword,
  resetPassword,

  sendOtp,
  verifyOtp
};
