const mongoose = require('mongoose');

const ShowSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['anime', 'tv'], default: 'anime' },
  totalEpisodes: { type: Number, default: 0 },
  currentEpisode: { type: Number, default: 0 },
  status: { type: String, enum: ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'], default: 'Plan to Watch' },
  genres: [String],
  year: Number,
  streamingLinks: [{ platform: String, url: String }], // Required feature
  tags: [String],
  description: String,
  posterUrl: String,
  averageRating: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true });

module.exports = mongoose.models.Show || mongoose.model('Show', ShowSchema);