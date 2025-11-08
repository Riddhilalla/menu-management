const mongoose = require('mongoose');


// Item: represents a sellable menu item. `totalAmount` is derived from
// baseAmount, discount and taxPercent. The pre-save hook keeps totalAmount
// consistent so callers only need to provide baseAmount/discount/tax flags.
const ItemSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
  name: { type: String, required: true, trim: true },
  image: { type: String },
  description: { type: String },
  taxApplicable: { type: Boolean, default: false },
  taxPercent: { type: Number, default: 0 },
  baseAmount: { type: Number, required: true, min: 0 },
  discount: { type: Number, default: 0, min: 0 },
  totalAmount: { type: Number, default: 0 }
}, { timestamps: true });

// pre-save hook to calculate totalAmount from baseAmount/discount/tax
ItemSchema.pre('save', function (next) {
  const item = this;
  let amount = item.baseAmount || 0;
  // apply discount first
  if (item.discount) {
    amount = amount - item.discount;
  }
  // apply tax if applicable (taxPercent is treated as percent)
  if (item.taxApplicable && item.taxPercent) {
    amount = amount + (amount * (item.taxPercent / 100));
  }
  // store rounded value and prevent negative totals
  item.totalAmount = Math.max(0, Number(amount.toFixed(2)));
  next();
});

module.exports = mongoose.model('Item', ItemSchema);
