const Joi = require('joi');

const adminRegister = Joi.object({

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
 
  adminType: Joi.string()
    .required()
    .messages({
      'string.empty': 'Admin type is required',
  }),
});

const adminLogin = Joi.object({
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

const updateAdmin = Joi.object({
  adminId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.empty': 'Admin ID is required',
      'string.pattern.base': 'Admin ID must be a valid MongoDB ObjectId',
  }),

  status: Joi.boolean().required()
})

module.exports = { adminRegister,adminLogin,updateAdmin };