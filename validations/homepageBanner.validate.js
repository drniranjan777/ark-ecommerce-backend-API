const Joi = require('joi');

const homePageBanner = Joi.object({
  title: Joi.string().required().min(1).max(100),
  description: Joi.string().required().min(1).max(200),
  imageUrl:Joi.string().required().min(1).max(100),
});



module.exports = {homePageBanner};