const mongoose = require('mongoose');


// Subcategory: belongs to a Category (e.g., "Cold Drinks" under "Drinks")
const SubcategorySchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true, trim: true },
  image: { type: String },
  description: { type: String },
  taxApplicable: { type: Boolean, default: false },
  taxPercent: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Subcategory', SubcategorySchema);
