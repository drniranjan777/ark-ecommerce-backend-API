// validations/common.validation.js
const Joi = require('joi');
const mongoose = require('mongoose');

const objectId = (field = 'id') =>
  Joi.object({
    [field]: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      }, 'ObjectId validation')
      .required()
      .messages({
        'any.required': `${field} is required`,
        'any.invalid': `${field} must be a valid ObjectId`,
      }),
  });

module.exports = {
  objectId,
};
