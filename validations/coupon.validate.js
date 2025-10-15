const Joi = require('joi');

const validateCoupon = Joi.object({
  coupon: Joi.string().required().min(1).max(255),
  discount: Joi.number().required().min(1).max(100)
});

module.exports = {validateCoupon};