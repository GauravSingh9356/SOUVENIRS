const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
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
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
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
  // socket.emit('me', socket.id);

  //Sending an object when emmiting an event

  socket.on('sendingMessage', (data) => {
    // console.log(data);
    upgradedServer.emit('broadcastMessage', data);
  });

  // console.log('Connection established', socket.id);
});
server.listen(PORT, () => {
  console.log(`We are listening at ${PORT}`);
});
