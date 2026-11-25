const mongoose = require('mongoose');
const ClubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  posts: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    spoilers: { type: Boolean, default: false }, // Required feature
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Club', ClubSchema);