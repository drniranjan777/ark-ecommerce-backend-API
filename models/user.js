const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name:{type:String,required:true},
    mobileNumber:{type:Number,required:true},
    status: {
      type: String,
      enum: ['active', 'block'],  
      default: 'active',      
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
