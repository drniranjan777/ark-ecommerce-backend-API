const Joi = require('joi');

const cartValidation = Joi.object({
  productId: Joi.string().hex().length(24).required(),
  quantity: Joi.number().integer().min(1).required()
});


const removeFromCartSchema = Joi.object({
  productId: Joi.string().hex().length(24).required()
});


const buyNowUpdateValidation = Joi.object({
  quantity:Joi.number().required().min(1)
});

module.exports = {
  cartValidation,
  removeFromCartSchema,
  buyNowUpdateValidation
};
