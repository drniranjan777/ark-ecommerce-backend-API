const Joi = require('joi');

const homePageBanner = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  imageUrl:Joi.string().required(),
});



module.exports = {homePageBanner};