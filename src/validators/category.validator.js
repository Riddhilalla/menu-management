const Joi = require('joi');

// Joi schemas for validating category payloads
// - createSchema: used for POST (name required)
// - updateSchema: used for PUT (allow partial updates; name optional)
const createSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  image: Joi.string().uri().optional(),
  description: Joi.string().optional(),
  taxApplicable: Joi.boolean().optional(),
  taxPercent: Joi.number().min(0).max(100).optional(),
  taxType: Joi.string().valid('inclusive', 'exclusive').optional()
});

const updateSchema = Joi.object({
  name: Joi.string().trim().min(1).optional(),
  image: Joi.string().uri().optional(),
  description: Joi.string().optional(),
  taxApplicable: Joi.boolean().optional(),
  taxPercent: Joi.number().min(0).max(100).optional(),
  taxType: Joi.string().valid('inclusive', 'exclusive').optional()
});

exports.validateCategory = (req, res, next) => {
  // used for creation (POST)
  const { error } = createSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ message: 'Validation error', details: error.details.map(d => d.message) });
  next();
};

exports.validateCategoryUpdate = (req, res, next) => {
  // used for updates (PUT) - allow partial updates
  const { error } = updateSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ message: 'Validation error', details: error.details.map(d => d.message) });
  next();
};
