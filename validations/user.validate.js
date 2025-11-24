const Joi = require('joi');

const userRegister = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'any.required': 'Password is required',
  }),
  name: Joi.string().min(1).required().messages({
    'string.empty': 'Name cannot be empty',
    'any.required': 'Name is required',
  }),
  mobileNumber: Joi.number().integer().optional().messages({
    'number.base': 'Mobile Number must be a number',
  }),
});


const userLogin = Joi.object({
  email: Joi.string()
      .email()
      .required()
      .messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email address',
  }),
  
  password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
  }),
})

const sendOtp = Joi.object({
  mobileNumber: Joi.string()
    .length(10) 
    .pattern(/^[0-9]+$/) 
    .required()
    .messages({
      "string.base": "Mobile number must be a string",
      "string.length": "Mobile number must be exactly 10 digits",
      "string.pattern.base": "Mobile number must contain only digits",
      "any.required": "Mobile number is required",
    }),
})

const verifyOtp = Joi.object({
  mobileNumber: Joi.string()
    .length(10) 
    .pattern(/^[0-9]+$/) 
    .required()
    .messages({
      "string.base": "Mobile number must be a string",
      "string.length": "Mobile number must be exactly 10 digits",
      "string.pattern.base": "Mobile number must contain only digits",
      "any.required": "Mobile number is required",
    }),
  otp:Joi.number().required()
})

module.exports = { userRegister,userLogin,sendOtp,verifyOtp};
