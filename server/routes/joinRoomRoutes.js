const router = require('express').Router();
const { joinRoom } = require('../controllers/createRoom');

router.route('/').post(joinRoom);

module.exports = router;
