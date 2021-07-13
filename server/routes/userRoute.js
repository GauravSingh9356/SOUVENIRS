const express = require('express');
const {
  signin,
  signup,
  verifyEmail,
  forgetPassword,
  updatePassword,
} = require('../controllers/user');

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/verifyEmail/:token', verifyEmail);
router.post('/forgetPassword', forgetPassword);
router.post('/updatePassword', updatePassword);

module.exports = router;
