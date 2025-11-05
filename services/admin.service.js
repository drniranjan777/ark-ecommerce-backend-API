const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const transporter = require('../config/mailer')

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = '1d';

const findByEmail =async(email) => {
  return await Admin.findOne({ email });
}

const verifyPassword = async (admin, plainPassword) => {
  return await bcrypt.compare(plainPassword, admin.password);
}

const adminRegister = async (req) => {
  const { email, password,adminType} = req.body;

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
    adminType,
    status:adminType === 'superadmin'? true:false
  });

  return newAdmin;
};


const loginAdmin = async(req, res) => {
    const { email, password } = req.body;


    const admin = await findByEmail(email);

    if (!admin) {
      throw new AppError('Invalid email or password',400);
    }

    if(admin.status === false) throw new AppError('You are not approved from super admin',409)

    const isPasswordValid = await verifyPassword(admin, password);
    if (!isPasswordValid) {
       throw new AppError('Password not correct',400);
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      role: admin.adminType,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    return {token,payload};
 
}


const updateAdminStatus = async(req) => {
   const admin = req.admin
   
   const {adminId,status} = req.body

   const adminCheck = await Admin.findById(adminId)

   if(!adminCheck) throw new AppError('Admin not found',404)

   if(admin.role !== 'superadmin') throw new AppError('Your are not eligible to update status',409)

    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      {$set:{status:status}},
      {new:true}
    )

   return updatedAdmin
}

//delete admin
const deleteAdmin = async(req) => {
   const {adminId} = req.params

   const admin = req.admin
   if(admin.role !== 'superadmin') throw new AppError('Your are not eligible to update status',409)

   const checkAdmin = await Admin.findById(adminId)

   if(!checkAdmin) throw new AppError('Admin not found',404)

   const deletedAdmin = await Admin.findByIdAndDelete(adminId)

   return deletedAdmin
}

//get all admins
const getAllAdmins = async(req) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page-1)*limit

  const totalAdmins = await Admin.countDocuments()

  const totalPages = Math.ceil(totalAdmins/limit)

  const admins = await Admin.find({
    adminType:{$in:['manager','support']}
  }).skip(skip).limit(limit)

  return {
    admins,
    totalPages,
    currentPage:page
  }
}


//forget password

const forgetPassword = async(req) => {
  const {email,resetLink} = req.body

  const admin = await Admin.findOne({email})
  
  if(!admin) throw new AppError('Admin not found',404)

  const token = crypto.randomBytes(32).toString("hex")
  
  admin.resetPasswordToken = token
  admin.resetPasswordExpires = Date.now() + 3600000
  await admin.save()

  // Send email
  const link = `${resetLink}?token=${token}`

  const mailOptions = {
    from: `"My App" <${process.env.SMTP_USER}>`,
    to: user.email,
    subject: "Reset Your Password",
    html: `
      <p>You requested a password reset.</p>
      <p>Click below to reset your password:</p>
      <a href="${link}">${link}</a>
      <p>This link expires in 1 hour.</p>
    `,
  };

  await transporter.sendMail(mailOptions)

  return 

}

//reset password
const resetPassword = async() => {
  const {newPassword,token} = req.body

  const admin = await Admin.findOne({
    resetPasswordToken:token,
    resetPasswordExpires:{$gt:Date.now()}
  })

  if(!admin) throw new AppError('Invalid or expire token',409)

  admin.password = await bcrypt.hash(newPassword,10)
  admin.resetPasswordToken = undefined
  admin.resetPasswordExpires = undefined

  await admin.save()

  return
}


module.exports = {
  adminRegister,
  loginAdmin,
  updateAdminStatus,
  deleteAdmin,
  getAllAdmins,

  forgetPassword,
  resetPassword
};
