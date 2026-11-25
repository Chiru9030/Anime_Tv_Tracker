router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.preferences.length) return res.json([]);

  const recs = await Show.find({ 
    genres: { $in: user.preferences }, 
    _id: { $nin: user.watchlist } 
  }).limit(5);

  res.json(recs);
});