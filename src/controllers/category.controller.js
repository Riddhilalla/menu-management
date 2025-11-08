
const Category = require('../models/category.model');

// Create a category
// Expects validated body (see validators/category.validator.js)
exports.createCategory = async (req, res, next) => {
  try {
    const data = req.body;
    const category = new Category(data);
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (err) {
    // handle duplicate name error from Mongo (unique index)
    if (err.code === 11000) {
      err.status = 409;
      err.message = 'Category with this name already exists';
    }
    next(err);
  }
};

// List all categories (simple alphabetical list)
exports.listCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

// Get category by id or by name (flexible param)
exports.getCategory = async (req, res, next) => {
  try {
    const idOrName = req.params.idOrName;
    let category = null;
    if (mongooseIsObjectId(idOrName)) {
      category = await Category.findById(idOrName);
    }
    if (!category) {
      category = await Category.findOne({ name: idOrName });
    }
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    next(err);
  }
};

// Update category by id
exports.updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const updated = await Category.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Category not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// helper to detect ObjectId-like values
function mongooseIsObjectId(val) {
  const mongoose = require('mongoose');
  return mongoose.Types.ObjectId.isValid(val);
}
