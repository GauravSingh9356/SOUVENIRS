const express = require('express');
const { signin, signup, verifyEmail } = require('../controllers/user');

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/verifyEmail/:token', verifyEmail);

module.exports = router;
