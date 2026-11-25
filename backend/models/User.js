const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }],
  preferences: [String] 
}, { timestamps: true }); 

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);