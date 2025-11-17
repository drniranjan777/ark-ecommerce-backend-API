const Joi = require('joi');

const newsLetterValidation = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })        
        .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
        .required()
        .messages({
            'string.pattern.base': 'Only Gmail addresses are allowed',
            'string.email': 'Invalid email format',
            'any.required': 'Email is required',
        }),
});

module.exports = { newsLetterValidation }
