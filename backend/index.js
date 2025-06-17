// backend/index.js
/* eslint-env node */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

console.log('Loaded .env');
console.log('MONGO_URI:', process.env.MONGO_URI);


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

console.log('MONGO_URI:', process.env.MONGO_URI);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Routes
//app.use('/api/character', require('./routes/characterRoutes'));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('🚀 Backend is running');
});

