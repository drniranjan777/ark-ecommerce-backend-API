const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String,trim:true,unique:true,sparse:true},
    password: { type: String,unique:true,sparse:true },
    name:{type:String,},
    mobileNumber:{type:Number},
    status: {
      type: String,
      enum: ['active', 'block'],  
      default: 'active',      
      required: true,
    },
    resetPasswordToken: {
      type:String,
      
    },
    resetPasswordExpires: Date,
    otpSession: String,
    otpSentAt: Date,
    otpResendCount: { type: Number, default: 0 }
    // otpExpires: Date
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
