import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'react-responsive-modal';
import { Button } from '@material-ui/core';

import Send from './Send';
import MessageDiv from './MessageDiv';

import './style.css';

const Chat = ({ socket }) => {
  const { roomName } = useParams();
  console.log(roomName);
  //   console.log(roomName);
  const pic =
    JSON.parse(localStorage.getItem('profile'))?.result?.imageUrl ||
    'https://image.flaticon.com/icons/svg/145/145867.svg';
  const name =
    JSON.parse(localStorage.getItem('profile'))?.result?.name?.split(' ')[0] ||
    null;

  const room = useSelector((state) => {
    // console.log(state);
    localStorage.setItem('ID', JSON.stringify(state.auth.roomName));
    return state.auth.roomName;
  });

  const [showId, setShowId] = useState(!room?.isJoining);
  const [showusers, setShowUsers] = useState(false);

  const [messages, setMessages] = useState([]);
  const [peoples, setPeoples] = useState([]);

  useEffect(() => {
    if (room?.isJoining) {
      toast.success(`You are Joined!`, {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(`Room Successfully Created!`, {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    socket.emit('join', { name, room: roomName, photo: pic });
    socket.on('roomData', (data) => {
      // console.log(data);

      setPeoples(data.users);
    });
  }, [name]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([
        ...messages,
        {
          name: message.user,
          message: message.text,
          pic: message.photo,
          time: new Date().toLocaleTimeString(),
        },
      ]);
    });
    console.log(messages);
  }, [messages]);

  const handleSubmit = (message, e) => {
    e.preventDefault();
    socket.emit('sendingMessage', {
      text: message,
      user: name,
      photo: pic,
      room: roomName,
    });
    document.title = `Message Sent!`;
    setTimeout(function () {
      document.title = 'Souvenirs';
    }, 3000);
  };

  // useEffect(() => {
  //   handleConnect();
  // }, []);

  return (
    <>
      <div className='chatdiv'>
        <section className='msger'>
          <header
            className='msger-header'
            style={{ background: '#2979FF', color: 'white', padding: '15px' }}
          >
            <div className='msger-header-title' style={{ marginTop: '8px' }}>
              <i className='fas fa-comment-alt'>
                <img
                  style={{ marginRight: '5px' }}
                  src='https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/onlineIcon.png'
                />
              </i>
              {'     '}
              {roomName} Room
            </div>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => setShowUsers(!showusers)}
            >
              Show Online Users
            </Button>
            {showusers && roomName && (
              <Modal
                center
                open={showusers}
                onClose={() => {
                  setShowUsers(!showusers);
                }}
                classNames={{
                  overlay: 'customOverlay',
                  modal: 'customModal',
                }}
              >
                <h2 style={{ textAlign: 'center', padding: '18px' }}>
                  Online Users in this room
                </h2>
                {console.log(peoples)}
                {peoples.map((user, i) => {
                  // console.log(user);
                  return (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <p>
                        <i
                          className='fas fa-comment-alt'
                          // style={{
                          //   display: 'inline-block',
                          //   verticalAlign: 'middle',
                          // }}
                        >
                          <img
                            style={{
                              marginRight: '15px',
                              width: '8px',
                              height: '8px',
                            }}
                            src='https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/onlineIcon.png'
                          />
                        </i>
                        <img
                          className='msg-img'
                          src={user.photo}
                          style={{
                            display: 'inline-block',
                            verticalAlign: 'middle',
                            width: '20%',
                          }}
                        />
                        <Button
                          style={{
                            display: 'inline-block',
                            verticalAlign: 'middle',
                            marginLeft: '10px',
                            background: '#f50057',
                            color: 'white',
                          }}
                          variant='contained'
                          disabled={true}
                        >
                          {user.name.toUpperCase()}
                        </Button>
                      </p>
                    </div>
                  );
                })}
              </Modal>
            )}
            <div className='msger-header-options'>
              <span>
                <i className='fas fa-cog'>
                  <a href='/' alt='close'>
                    <img src='https://raw.githubusercontent.com/adrianhajdin/project_chat_application/master/client/src/icons/closeIcon.png' />
                  </a>
                </i>
              </span>
            </div>
          </header>
          <MessageDiv messages={messages} />

          <Send handleSubmit={handleSubmit} />
        </section>
      </div>
      {showId && room && (
        <Modal
          center
          open={showId}
          onClose={() => {
            setShowId(!showId);
          }}
          classNames={{
            overlay: 'customOverlay',
            modal: 'customModal',
          }}
        >
          <h2 style={{ textAlign: 'center' }}>Unique Room Id</h2>

          <p style={{ color: 'black' }}>
            Room Id: <b>{room?.pass}</b>
          </p>
          <p style={{ color: 'black' }}>
            Share with your friends to start private group Chat!
          </p>
        </Modal>
      )}
    </>
  );
};

export default Chat;
