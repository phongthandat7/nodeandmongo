const Joi = require("joi");

// ✅ validate params (ví dụ: /users/:id)
const validateParam = (schema, name) => {
  return (req, res, next) => {
    console.log("---- VALIDATE PARAM ----");
    console.log("Param name:", name);
    console.log("req.params:", req.params);
    console.log("req.params[name]:", req.params[name]);

    const validationResult = schema.validate({ param: req.params[name] });
    console.log("Validation result:", validationResult);

    if (validationResult.error) {
      console.log("❌ Param validation failed:", validationResult.error.details);
      return res.status(400).json(validationResult.error);
    } else {
      console.log("✅ Param validation success!");

      if (!req.value) req.value = {};
      if (!req.value.params) req.value.params = {};

      req.value.params[name] = validationResult.value.param;
      console.log("req.value after param validation:", req.value);

      next();
    }
  };
};

// ✅ validate body (ví dụ: POST /users)
const validateBody = (schema) => {
  return (req, res, next) => {
    console.log("---- VALIDATE BODY ----");
    console.log("req.body received:", req.body);

    const validationResult = schema.validate(req.body);
    console.log("Validation result:", validationResult);

    if (validationResult.error) {
      console.log("❌ Body validation failed:", validationResult.error.details);
      return res.status(400).json(validationResult.error);
    } else {
      console.log("✅ Body validation success!");

      if (!req.value) req.value = {};
      if (!req.value.body) req.value.body = {};

      req.value.body = validationResult.value;
      console.log("req.value after body validation:", req.value);

      next();
    }
  };
};

// ✅ validate query (ví dụ: /users?limit=10&page=2)
const validateQuery = (schema) => {
  return (req, res, next) => {
    console.log("---- VALIDATE QUERY ----");
    console.log("req.query received:", req.query);

    const validationResult = schema.validate(req.query);
    console.log("Validation result:", validationResult);

    if (validationResult.error) {
      console.log("❌ Query validation failed:", validationResult.error.details);
      return res.status(400).json(validationResult.error);
    } else {
      console.log("✅ Query validation success!");

      if (!req.value) req.value = {};
      if (!req.value.query) req.value.query = {};

      req.value.query = validationResult.value;
      console.log("req.value after query validation:", req.value);

      next();
    }
  };
};

// ✅ Joi schemas ví dụ
const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  }),

  userSchema: Joi.object().keys({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    age: Joi.number().min(1).optional()
  }),

  querySchema: Joi.object().keys({
    limit: Joi.number().integer().min(1).max(100).default(10),
    page: Joi.number().integer().min(1).default(1)
  })
};

module.exports = {
  validateParam,
  validateBody,
  validateQuery,
  schemas
};
