const router = require('express').Router();
const { createChatRoom, joinRoom } = require('../controllers/createRoom');

router.route('/').post(createChatRoom);


module.exports = router;
