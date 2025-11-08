const Joi = require('joi');

// Joi schema for item payloads — used by POST /api/items and PUT /api/items/:id
const schema = Joi.object({
  categoryId: Joi.string().required(),
  subCategoryId: Joi.string().optional().allow(null, ''),
  name: Joi.string().trim().min(1).required(),
  image: Joi.string().uri().optional().allow(''),
  description: Joi.string().optional().allow(''),
  taxApplicable: Joi.boolean().optional(),
  taxPercent: Joi.number().min(0).max(100).optional(),
  baseAmount: Joi.number().min(0).required(),
  discount: Joi.number().min(0).optional()
});

exports.validateItem = (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ message: 'Validation error', details: error.details.map(d => d.message) });
  next();
};
