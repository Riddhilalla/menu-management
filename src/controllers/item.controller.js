const Item = require('../models/item.model');

// Create item — body should be validated by validators/item.validator
exports.createItem = async (req, res, next) => {
  try {
    const data = req.body;
    const item = new Item(data);
    const saved = await item.save();
    res.status(201).json(saved);
  } catch (err) { next(err); }
};

// List all items (simple alphabetical listing). Consider adding pagination
// in future if the dataset grows.
exports.listItems = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ name: 1 });
    res.json(items);
  } catch (err) { next(err); }
};

// Get single item by id
exports.getItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await Item.findById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) { next(err); }
};

// Update item by id
exports.updateItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const updated = await Item.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Item not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

// List items belonging to a category id
exports.itemsByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const items = await Item.find({ categoryId }).sort({ name: 1 });
    res.json(items);
  } catch (err) { next(err); }
};

// List items belonging to a subcategory id
exports.itemsBySubcategory = async (req, res, next) => {
  try {
    const subId = req.params.id;
    const items = await Item.find({ subCategoryId: subId }).sort({ name: 1 });
    res.json(items);
  } catch (err) { next(err); }
};

// Search items by name (case-insensitive partial match). `name` query param
// is required. Results are limited to 50 items to avoid huge responses.
exports.searchItems = async (req, res, next) => {
  try {
    const q = req.query.name || '';
    if (!q) return res.status(400).json({ message: 'Query "name" required' });
    const regex = new RegExp(q, 'i');
    const items = await Item.find({ name: regex }).limit(50);
    res.json(items);
  } catch (err) { next(err); }
};
