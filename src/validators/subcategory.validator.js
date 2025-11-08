const Joi = require('joi');

// Joi schema for subcategory payloads
const schema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  image: Joi.string().uri().optional(),
  description: Joi.string().optional(),
  taxApplicable: Joi.boolean().optional(),
  taxPercent: Joi.number().min(0).max(100).optional()
});

exports.validateSubcategory = (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ message: 'Validation error', details: error.details.map(d => d.message) });
  next();
};
