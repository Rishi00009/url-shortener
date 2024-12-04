const URL = require('../models/URL');
const crypto = require('crypto');

// Create Short URL
exports.createShortURL = async (req, res) => {
  const { longURL } = req.body;
  const shortURL = crypto.randomBytes(6).toString('hex'); // Generate short URL

  const newURL = new URL({ longURL, shortURL });
  await newURL.save();
  res.json({ shortURL, longURL });
};

// Redirect to Long URL
exports.redirectURL = async (req, res) => {
  const { shortURL } = req.params;
  const url = await URL.findOne({ shortURL });
  if (!url) return res.status(404).send('URL not found');

  url.clickCount++;
  await url.save();

  res.redirect(url.longURL);
};
