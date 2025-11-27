const User = require('../models/user');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const transporter = require('../config/mailer')
const generateOtp = require('../utils/generateOtp')
const {sendSms,verifyOtp } = require('./sms.service')

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

  // console.log(user,'user..............')

  if (!user) {
    throw new AppError('Invalid email or password', 400);
  }

  if(user.status === 'block'){
    throw new AppError('You are Blocked from admin',403)
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
const getAllUsers = async (req,limit=10) => {
  const page = parseInt(req.query.page) || 1;
  limit = parseInt(req.query.limit) || limit;

  const skip = (page - 1) * limit;

  const users = await User.find()
    .select('-password')
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments();

  return {
    users: users,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

//forget password

const forgotPasswordService = async (req) => {
  const {email,resetLink} = req.body
  const user = await User.findOne({ email })


  if (!user) throw new AppError("User not found",404)

  // Generate token
  const token = crypto.randomBytes(32).toString("hex")

  // Set token + expiry (1 hour)
  user.resetPasswordToken = token
  user.resetPasswordExpires = Date.now() + 3600000
  await user.save();

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
};

//reset password
const resetPasswordService = async (req) => {

  const {token,newPassword} = req.body

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) throw new AppError("Invalid or expired token")

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10)
  user.password = hashedPassword
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined

  await user.save()
  return
};

//send otp

const sendOtp = async(req) => {
  const {mobileNumber} = req.body

  let user = await User.findOne({mobileNumber:mobileNumber})

  console.log(user,'userrrrrrrrrrrrr')

  if(!user) {
     user = await User.create({
      mobileNumber:mobileNumber,
     })
  }

  // const otp = generateOtp();
  // const hashedOtp = await bcrypt.hash(String(otp), 10);

  
  // user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes

  if (user.otpSentAt && Date.now() - user.otpSentAt.getTime() < 60000) { // 1 min
    throw new Error("Please wait before resending OTP");
  }

  const sessionId = await sendSms(mobileNumber);

  user.otpSession = sessionId
  user.otpSentAt = new Date();
  user.otpResendCount = (user.otpResendCount || 0) + 1;

  await user.save();

  return 
}


//verify otp

const verifyOtpService = async(req) => {
  const {mobileNumber,otp} = req.body

  const user = await User.findOne({mobileNumber:mobileNumber})

  const data = await verifyOtp(user.otpSession,otp)



  if (data.Status !== "Success") {
    throw new AppError(data.Details || "Invalid OTP",400);
  }


  user.otpSession = null;
  user.otpSentAt = null;
  user.otpResendCount = 0;
  
  await user.save();

   const payload = {
    id: user._id,
    // email: user.email,
    // name: user.name,
    status: user.status,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return {token,payload}
}

module.exports = {
  userRegister,
  loginUser,
  updateUser,
  deleteUser,
  getAllUsers,

  forgotPasswordService,
  resetPasswordService,

  sendOtp,
  verifyOtpService
};
