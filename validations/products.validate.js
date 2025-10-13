const Joi = require('joi');

const productValidation = Joi.object({
  name: Joi.string().required().min(1).max(255),
  description: Joi.string().required().min(1).max(1000),
  sku: Joi.string().required().min(1).max(100),
  thumbnail: Joi.string().uri().required(),
  previews: Joi.array().items(Joi.string().uri()).required().min(1),
  price: Joi.number().required().min(0),
  tax: Joi.number().required().min(0),
  stocklevel: Joi.number().integer().required().min(0),
  category: Joi.string().required().min(1).max(255),
  size: Joi.number().required().min(0),
  color: Joi.string().required().min(1).max(100),
  packsize: Joi.number().integer().required().min(1),
  tags: Joi.array().items(Joi.string().min(1).max(50)).required().min(1),
  metadata: Joi.string().required(),
});

module.exports = {productValidation};
