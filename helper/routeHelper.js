const Joi = require('joi');

const validateBody = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json(validationResult.error);
    } else {
      if (!req.value) req.value = {};
      if (!req.value['params']) req.value.params = {};
      console.log(validationResult);
      req.value.body = validationResult.value;
      next();
    }
  };
};

const validateParam = (schema, name) => {
  return (req, res, next) => {
    console.log('params', req.params[name]);
    const validationResult = schema.validate({ param: req.params[name] });
    console.log('validationResult', validationResult);
    if (validationResult.error) {
      return res.status(400).json(validationResult.error);
    } else {
      console.log('1', req.value);
      if (!req.value) req.value = {};
      console.log('2', req.value.params);
      if (!req.value['params']) req.value.params = {};
      console.log('3', req.value);
      req.value.params[name] = validationResult.value.param;
      console.log('req value', req.value);
      next();
    }
  };
};

const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
  userSchema: Joi.object().keys({
    firstName: Joi.string().required().min(2),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
  }),
  userOptionalSchema: Joi.object().keys({
    firstName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    email: Joi.string().email(),
  }),
  deskSchema: Joi.object().keys({
    name: Joi.string().min(2),
    decription: Joi.string().min(2),
  }),
};

module.exports = {
  validateParam,
  validateBody,
  schemas,
};
