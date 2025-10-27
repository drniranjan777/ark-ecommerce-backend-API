const Joi = require('joi');

const brandValidation = Joi.object({
    brandName:Joi.string().required(),
    brandImage:Joi.string().required()
})


module.exports = {brandValidation}