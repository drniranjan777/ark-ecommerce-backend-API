const Joi = require('joi');
const mongoose = require('mongoose')

const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('"{{#label}}" must be a valid ObjectId');
  }
  return value;
})

const orderValidation = Joi.object({
  address: Joi.object({
    fullName: Joi.string().min(2).max(100).required(),
    street: Joi.string().min(5).required(),
    city: Joi.string().required(),
    state: Joi.string().allow('', null),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
    phone: Joi.string().pattern(/^[0-9+\-\s]+$/).required()
  }).required(),

  // items: Joi.array()
  //   .items(
  //     Joi.object({
  //       productId: objectId.required(),
  //       quantity: Joi.number().min(1).required(),
  //     })
  //   )
  //   .min(1)
  //   .required(),

  status: Joi.string()
    .valid('pending','confirmed', 'shipped', 'delivered', 'cancelled')
    .required(),

  paymentStatus: Joi.string()
    .valid('unpaid', 'paid', 'failed')
    .required(),

  coupon:Joi.string(),

});

const updateOrderItemStatus = Joi.object({
  orderId : Joi.string().required(),
  productId : Joi.string().required(),
  status : Joi.string().required()
})

const updateRefundStatus = Joi.object({
  orderId : Joi.string().required(),
  productId : Joi.string().required(),
  refundStatus : Joi.string().required()
})

const orderStatus = Joi.object({
   status: Joi.string().required()
})

module.exports = {
    orderValidation,
    updateOrderItemStatus,
    updateRefundStatus,
    orderStatus
}