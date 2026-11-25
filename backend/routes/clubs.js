const express = require('express');
const router = express.Router();
const Club = require('../models/Club');
const { auth } = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const c = new Club(req.body);
  c.members.push(req.user.id);
  await c.save();
  res.json(c);
});

router.post('/:id/join', auth, async (req, res) => {
  const c = await Club.findById(req.params.id);
  if(!c.members.includes(req.user.id)) c.members.push(req.user.id);
  await c.save();
  res.json({msg:'Joined club successfully'});
});

router.post('/:id/post', auth, async (req, res) => {
  const { text, spoilers } = req.body;
  const c = await Club.findById(req.params.id);
  if(!c.members.includes(req.user.id)) return res.status(403).json({msg: 'Must be a member to post'});
  
  c.posts.push({user:req.user.id, text, spoilers});
  await c.save();
  res.json({msg:'Posted successfully'});
});

router.get('/', async (req, res) => {
  const clubs = await Club.find().limit(50);
  res.json(clubs);
});

module.exports = router;