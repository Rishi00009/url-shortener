const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

// routes/url.js
router.get('/all', async (req, res) => {
  try {
    const urls = await URLModel.find();
    res.json(urls);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching URLs', error: err });
  }
});


module.exports = mongoose.model('URL', urlSchema);
