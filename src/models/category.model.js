const mongoose = require('mongoose');


// Category: top-level grouping (e.g. "Drinks", "Mains")
// - `taxApplicable`, `taxPercent`, and `taxType` capture tax rules at category level
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  image: { type: String },
  description: { type: String },
  taxApplicable: { type: Boolean, default: false },
  taxPercent: { type: Number, default: 0 },
  taxType: { type: String, enum: ['inclusive', 'exclusive'], default: 'exclusive' }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
