const Joi = require('joi');

const aboutValidation = Joi.object({
  aboutPage: Joi.string()
    .trim()
    .min(10) 
    .max(5000) 
    .required()
    .messages({
      'string.base': 'About page content must be a string.',
      'string.empty': 'About page content cannot be empty.',
      'string.min': 'About page must be at least {#limit} characters long.',
      'string.max': 'About page cannot exceed {#limit} characters.',
      'any.required': 'About page content is required.'
    })
});

module.exports = {aboutValidation};
