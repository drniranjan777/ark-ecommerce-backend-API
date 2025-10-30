const Joi = require('joi');


const termsAndConditonValidate = Joi.object({
    termsAndConditions:Joi.string().required()
})

module.exports = {termsAndConditonValidate}