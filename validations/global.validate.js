// validations/common.validation.js
const Joi = require('joi');
const mongoose = require('mongoose');

const objectId = (name = 'id') =>
  Joi.object({
    [name]: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.error('any.invalid');
        }
        return value;
      }, 'ObjectId Validation')
      .required(),
  });

module.exports = {
  objectId,
};
