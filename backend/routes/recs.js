const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const Show = require('../models/Show'); 
const { auth } = require('../middleware/auth'); 

router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const watchedShows = await Show.find({ _id: { $in: user.watchlist } });
    const genres = watchedShows.flatMap(show => show.genres || []);
    const uniqueGenres = [...new Set(genres)].slice(0, 3); 

    if (uniqueGenres.length === 0) return res.json([]); 

    const recs = await Show.find({ 
      genres: { $in: uniqueGenres }, 
      _id: { $nin: user.watchlist } 
    }).limit(5);

    res.json(recs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;