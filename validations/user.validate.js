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
  mobileNumber: Joi.number().integer().required().messages({
    'number.base': 'Mobile Number must be a number',
    'any.required': 'Mobile Number is required',
  }),
});

module.exports = { userRegister };
