import React from 'react';
import { Container } from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import socketIOClient from 'socket.io-client';

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Error from './components/Error';
import RoomName from './components/Chat/RoomName';
import PostDetails from './components/PostDetails/PostDetails';
import Choose from './components/Choose';

import Chat from './components/Chat/Chat';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'))?.result?.name;

  var socket = socketIOClient('https://memoriesbygs.herokuapp.com', {
    transports: ['websocket', 'polling', 'flashsocket'],
  });

  // const [me, setMe] = useState();
  // socket.on('me', (id) => );

  return (
    <Router>
      <Container maxWidth='xl'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={() => <Redirect to='/posts' />} />
          <Route path='/posts' exact component={Home} />
          <Route path='/posts/search' exact component={Home} />
          <Route path='/posts/:id' exact component={PostDetails} />

          <Route
            path='/auth'
            exact
            component={() => {
              if (!user) return <Auth />;
              else return <Redirect to='/posts' />;
            }}
          />

          <Route path='/error' exact>
            <Error />
          </Route>
          <Route path='/choosechat' exact>
            <Choose />
          </Route>
          <Route path='/roomname' exact>
            <RoomName />
          </Route>

          <Route path='/roomchat/:roomName' exact>
            <Chat socket={socket} />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
