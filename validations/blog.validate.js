const Joi = require('joi');
const {CommonValidate} = require('../validations/index')


const blogValidate = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required().min(1),
    imageUrl:Joi.string().required(),
})

module.exports = {blogValidate}