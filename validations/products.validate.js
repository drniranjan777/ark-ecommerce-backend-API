const Joi = require('joi');

const productValidation = Joi.object({
  name: Joi.string().required().min(1).max(255),
  description: Joi.string().required().min(1).max(1000),
  sku: Joi.string().required().min(1).max(100),
  // thumbnail: Joi.string().uri().required(),
  previews: Joi.array().items(Joi.string().uri()).required().min(1),
  price: Joi.number().required().min(0),
  tax: Joi.number().required().min(0),
  stocklevel: Joi.number().integer().required().min(0),
  category: Joi.string().required().min(1).max(255),
  brand: Joi.string().required().min(1).max(255),
  size: Joi.number().required().min(0),
  color: Joi.string().required().min(1).max(100),
  packsize: Joi.number().integer().required().min(1),
  tags: Joi.array().items(Joi.string().min(1).max(50)).required().min(1),
  metadata: Joi.string().required(),
});

const productReviewValidation = Joi.object({
  product: Joi.string()
    .length(24) // MongoDB ObjectId is 24 characters
    .required()
    .messages({
      'string.base': 'Product ID must be a string',
      'string.length': 'Invalid product ID',
      'any.required': 'Product ID is required'
    }),

  rating: Joi.number()
    .integer()
    .min(1)
    .max(5)
    .required()
    .messages({
      'number.base': 'Rating must be a number',
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating must be at most 5',
      'any.required': 'Rating is required'
    }),

  review: Joi.string()
    .min(1)
    .max(1000) 
    .required()
    .messages({
      'string.base': 'Review must be a string',
      'string.min': 'Review cannot be empty',
      'string.max': 'Review cannot be more than 1000 characters',
      'any.required': 'Review is required'
    })
});

const productSize = Joi.object({
  size: Joi.string()
    .required()
    .messages({
      'string.base': 'Product ID must be a string',
      'string.length': 'Invalid product ID',
      'any.required': 'Product ID is required'
    }),
});

module.exports = {
  productValidation,
  productReviewValidation,
  productSize
};
