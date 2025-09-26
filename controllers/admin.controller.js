
const {Admin} = require('../services/index')
const catchAsync = require('../utils/catchAsync')


const registerAdmin = catchAsync(async (req, res) => {
  const admin = await Admin.adminRegister(req);

  res.status(201).json({
    success: true,
    message: 'Admin registered successfully',
    data: {
      id: admin._id,
      email: admin.email,
    },
  });
});

const loginAdmin = catchAsync(async (req, res) => {
  const admin = await Admin.loginAdmin(req);

  res.status(200).json({
    success: true,
    message: 'Admin login successfully',
    user: admin.payload,
    token:admin.token
  });
});


module.exports = {
    registerAdmin,
    loginAdmin
}