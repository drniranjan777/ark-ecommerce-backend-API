
const {Admin} = require('../services/index')
const catchAsync = require('../utils/catchAsync')

//admin resgister controller
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


//admin login controller
const loginAdmin = catchAsync(async (req, res) => {
  const admin = await Admin.loginAdmin(req);

  res.status(200).json({
    success: true,
    message: 'Admin login successfully',
    user: admin.payload,
    token:admin.token
  });
});


//admin update controller
const updateAdminStatus = catchAsync(async (req, res) => {
  const admin = await Admin.updateAdminStatus(req);

  res.status(200).json({
    success: true,
    message: 'Status updated successfully',
    data: admin
  });
});

//admin delete controller
const deleteAdmin = catchAsync(async (req, res) => {
  const admin = await Admin.deleteAdmin(req);

  res.status(200).json({
    success: true,
    message: 'Admin deleted successfully',
    data: admin
  });
});

//get admin controller
const getAdmins = catchAsync(async (req, res) => {
  const admin = await Admin.getAllAdmins(req);

  res.status(200).json({
    success: true,
    message: 'Admin fetched successfully',
    data: admin
  });
});

//forget password controller
const forgetPasswordAdmin = catchAsync(async (req, res) => {
  const response = await Admin.forgetPassword(req);

  return res.status(200).json({
    success: true,
    message: 'Password rest link sent to you email',
    data: response
  });
});

//reset password admin
const resetPasswordAdmin = catchAsync(async(req,res) => {
  const response = await Admin.resetPassword(req)


  return res.status(200).json({
    status:true,
    message:'Password updated successfull',
    data:response
  })
})

module.exports = {
    registerAdmin,
    loginAdmin,
    updateAdminStatus,
    deleteAdmin,
    getAdmins,
    forgetPasswordAdmin,
    resetPasswordAdmin
}