const Subcategory = require('../models/subcategory.model');

// Create a subcategory for a given categoryId path param
exports.createSubcategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const data = Object.assign({}, req.body, { categoryId });
    const sub = new Subcategory(data);
    const saved = await sub.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// List subcategories. If called via route that includes categoryId param,
// the controller will filter by it. The route file registers a generic
// /subcategories endpoint as well.
exports.listSubcategories = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const filter = {};
    if (categoryId) filter.categoryId = categoryId;
    const items = await Subcategory.find(filter).sort({ name: 1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// Get subcategory by id
exports.getSubcategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const sub = await Subcategory.findById(id);
    if (!sub) return res.status(404).json({ message: 'Subcategory not found' });
    res.json(sub);
  } catch (err) { next(err); }
};

// Update subcategory by id
exports.updateSubcategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const updated = await Subcategory.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Subcategory not found' });
    res.json(updated);
  } catch (err) { next(err); }
};
