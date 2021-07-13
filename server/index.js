const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./Users');
// const socket = require('socket.io');

const cors = require('cors');
const router = require('./routes/posts');
const userRoute = require('./routes/userRoute');
const chatRoomRoute = require('./routes/chatRoomRoutes');
const joinRoomRoute = require('./routes/joinRoomRoutes');

const dotenv = require('dotenv');
const app = express();

const server = require('http').createServer(app);
const upgradedServer = require('socket.io')(server, {
  cors: true,
  origins: ['http://localhost:3000'],
});

dotenv.config();

const PORT = process.env.PORT || 4000;
const DB = process.env.CONNECTION_URL;

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log('error in db connection'));

//routes
app.use('/posts', router);
app.get('/', (req, res) => {
  res.send('Hello to Memories API');
});

app.use('/users', userRoute);
app.use('/createroom', chatRoomRoute);
app.use('/joinroom', joinRoomRoute);

upgradedServer.on('connection', (socket) => {
  console.log('Connected Established Socket');
  //Sending an object when emmiting an event
  socket.on('join', ({ name, room, photo }) => {
    const { error, user } = addUser({ id: socket.id, name, room, photo });
    if (error) {
      console.log(error);
      return;
    }
    socket.emit('message', {
      user: 'admin',
      text: `${user.name}, Welcome to ${user.room}`,
      photo: user.photo,
    });

    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name} is Joined!`,
      photo: user.photo,
    });

    socket.join(user.room);
    upgradedServer
      .to(user.room)
      .emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  });

  socket.on('sendingMessage', (data) => {
    // console.log(data);
    const user = getUser(socket.id);
    upgradedServer.to(user.room).emit('message', data);
    upgradedServer
      .to(user.room)
      .emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      upgradedServer.to(user.room).emit('message', {
        user: 'admin',
        text: `${user.name} has left the room`,
      });
    }
  });

  // console.log('Connection established', socket.id);
});
server.listen(PORT, () => {
  console.log(`We are listening at ${PORT}`);
});
