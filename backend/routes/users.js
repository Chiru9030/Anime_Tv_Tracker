const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Show = require('../models/Show');
const { auth } = require('../middleware/auth.js');

router.post('/me/watchlist', auth, async (req, res) => {
  const { showId, status, currentEpisode } = req.body;
  const userId = req.user.id;
  
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });
    
    if (!user.watchlist.includes(showId)) {
        user.watchlist.push(showId);
        await user.save();
    }

    const show = await Show.findById(showId);
    if (show) {
      show.status = status || show.status;
      if (typeof currentEpisode === 'number') show.currentEpisode = currentEpisode;
      await show.save();
    }

    res.json({ msg: 'Watchlist updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/me/analytics', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    if (!user) return res.status(404).json({ msg: 'User not found' });
    
    const userWatchlist = await Show.find({ _id: { $in: user.watchlist } });
    const totalCompleted = userWatchlist.filter(s => s.status === 'Completed').length;
    const totalWatching = userWatchlist.filter(s => s.status === 'Watching').length;
    
    const totalEpisodesWatched = userWatchlist
        .filter(s => s.status === 'Completed')
        .reduce((sum, s) => sum + s.totalEpisodes, 0);

    const genreCounts = {};
    userWatchlist.forEach(show => {
        show.genres.forEach(g => { genreCounts[g] = (genreCounts[g] || 0) + 1; });
    });
    const topGenre = Object.entries(genreCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || 'None';

    res.json({ totalCompleted, totalWatching, totalEpisodesWatched, topGenre });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;