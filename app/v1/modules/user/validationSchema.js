const { required } = require("joi");

const Joi = require("celebrate").Joi;

const validationSchema = {
  sign_up: {
    body: Joi.object()
      .required()
      .keys({
        name: Joi.string().required().min(3),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(18).required(),
      }),
  },
  login: {
    body: Joi.object()
      .required()
      .keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(18).required(),
      }),
  },
  order_product: {
    body: Joi.object().required().keys({
      product_id: Joi.string().required(),
    }),
  },
};

module.exports = validationSchema;
