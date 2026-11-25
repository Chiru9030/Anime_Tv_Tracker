const express = require('express');
const router = express.Router();
const Show = require('../models/Show'); 
const Review = require('../models/Review'); 
const User = require('../models/User'); 
const { auth, adminOnly } = require('../middleware/auth'); 

router.get('/', async (req, res) => {
  try {
    const q = {};
    if (req.query.genre) {
      const genreRegex = new RegExp(req.query.genre, 'i'); 
      q.genres = { $in: [genreRegex] }; 
    }
    
    const shows = await Show.find(q).limit(200);
    res.json(shows);
  } catch (err) { 
    console.error("Error fetching shows:", err);
    res.status(500).json({ error: err.message }); 
  }
});

router.get('/:id', async (req, res) => {
  try {
    const show = await Show.findById(req.params.id); 
    if (!show) return res.status(404).json({ msg: 'Show not found' });
    res.json(show);
  } catch (err) { 
    console.error("Error fetching single show:", err);
    res.status(500).json({ error: err.message }); 
  }
});

router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const s = new Show(req.body);
    await s.save();
    res.json(s);
  } catch (err) { 
    console.error("Error creating show:", err);
    res.status(500).json({ error: err.message }); 
  }
});

router.post('/:id/review', auth, async (req, res) => {
  try {
    const { rating, text } = req.body;
    const showId = req.params.id;

    const review = new Review({ user: req.user.id, show: showId, rating, text });
    await review.save();

    const show = await Show.findById(showId);
    show.reviews.push(review._id);

    const allReviews = await Review.find({ show: showId }); 
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    show.averageRating = (totalRating / allReviews.length);

    await show.save();

    const updatedShow = await Show.findById(showId).populate('reviews');
    res.status(201).json(updatedShow); 

  } catch (err) {
    console.error("Review posting failed:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;