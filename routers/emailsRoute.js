const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const { sendEmail } = require('../controllers/emailController');

router.post('/send', sendEmail);

module.exports = router;
