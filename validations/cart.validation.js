const Joi = require('joi');

const cartValidation = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().min(1).required()
});


const removeFromCartSchema = Joi.object({
  productId: Joi.string().hex().length(24).required()
});

module.exports = {
  cartValidation,
  removeFromCartSchema
};
