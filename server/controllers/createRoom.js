const ChatRoom = require('../models/chatRoom');
const randomWords = require('random-words');
const bcrypt = require('bcryptjs');

const createChatRoom = async (req, res) => {
  try {
    const { roomName } = req.body;

    const existingRoom = await ChatRoom.findOne({ name: roomName });
    if (existingRoom) {
      return res.json({ message: 'This Room already exists! Create OR Join' });
    }
    const passName = randomWords() + ' chat';
    const hashedPassword = await bcrypt.hash(passName, 12);

    const newRoom = await ChatRoom.create({
      name: roomName,
      password: hashedPassword,
      pass: passName,
    });

    res.json({ result: 'success', newRoom });
  } catch (error) {
    res.json({
      message: 'Something went wrong While Creating Room! ' + error.message,
    });
  }
};

const joinRoom = async (req, res) => {
  try {
    let { pass } = req.body;
    const existingRoom = await ChatRoom.findOne({ pass: pass });
    if (!existingRoom) {
      return res.json({ message: 'No Room exist with this Id!' });
    }
    const roomPassword = await bcrypt.compare(pass, existingRoom.password);
    if (!roomPassword)
      return res.json({
        message: 'Room Id encryption does not match with Room Password!',
      });

    res.json({ result: 'Success', existingRoom });
  } catch (error) {
    res.json({
      message:
        'Something went wrong while verifying Id of Room!' + error.message,
    });
  }
};

module.exports = { createChatRoom, joinRoom };
