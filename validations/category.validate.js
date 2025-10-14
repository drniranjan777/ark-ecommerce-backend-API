const Joi = require('joi');

const categoryValidate = Joi.object({
  category: Joi.string().required().min(1).max(255),
 
});

module.exports = {categoryValidate};