const Joi = require('joi');

const wishlistValidation = Joi.object({
  productId: Joi.string().hex().length(24).required(),
});


module.exports = {
 wishlistValidation
};
