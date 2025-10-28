const Joi = require('joi');

const validateCoupon = Joi.object({
  coupon: Joi.string().required().min(1).max(255),
  discount: Joi.number().required().min(1).max(100)
});

const applyCoupon = Joi.object({
  couponCode: Joi.string().required().min(1).max(255),
  total: Joi.number().required().min(1)
});

module.exports = {validateCoupon,applyCoupon};