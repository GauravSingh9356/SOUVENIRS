const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'Message cannot be empty!'],
  },

  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'ChatRoom is required!',
    ref: 'ChatRoom',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: 'User is required!',
    ref: 'User',
  },
});

const ChatRoom = mongoose.model('Message', MessageSchema);

module.exports = ChatRoom;
