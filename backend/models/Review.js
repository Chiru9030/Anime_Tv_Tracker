const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show' },
  rating: { type: Number, min: 1, max: 10, required: true },
  text: String
}, { timestamps: true });

module.exports = mongoose.models.Review || mongoose.model('Review', ReviewSchema);