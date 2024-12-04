const express = require('express');
const { createShortURL, redirectURL } = require('../controllers/urlController');
const router = express.Router();

router.post('/shorten', createShortURL);
router.get('/:shortURL', redirectURL);

module.exports = router;
