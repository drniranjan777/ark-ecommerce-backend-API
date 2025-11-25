const Joi = require('joi');

const colorValidate = Joi.object({
    colorName:Joi.string().required(),
    colorCode:Joi.string().required()
})


module.exports = {colorValidate}