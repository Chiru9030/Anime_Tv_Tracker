const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config(); 

const authRoutes = require('./routes/auth');
const showRoutes = require('./routes/shows');
const userRoutes = require('./routes/users');
const clubRoutes = require('./routes/clubs');
const recRoutes = require('./routes/recs');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/shows', showRoutes); 
app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/recs', recRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    app.listen(PORT, () => console.log(`✅ Server started on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
  });