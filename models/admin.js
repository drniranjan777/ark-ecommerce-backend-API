const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    adminType: {
      type: String,
      enum:['superadmin','manager','support'],
      required: true,
    },
    status: { 
      type: Boolean,
      default:false, 
      required: true 
    },
    resetPasswordToken:{
      type:String
    },
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
