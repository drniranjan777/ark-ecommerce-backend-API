const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
    name:{type:String,},
    mobileNumber:{type:Number,required:true},
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
