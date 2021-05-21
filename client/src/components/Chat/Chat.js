import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'react-responsive-modal';

import Send from './Send';
import MessageDiv from './MessageDiv';

import './style.css';

const Chat = ({ socket }) => {
  const { roomName } = useParams();
  //   console.log(roomName);
  const pic =
    JSON.parse(localStorage.getItem('profile'))?.result?.imageUrl || null;
  const name =
    JSON.parse(localStorage.getItem('profile'))?.result?.name?.split(' ')[0] ||
    null;

  const room = useSelector((state) => {
    // console.log(state);
    localStorage.setItem('ID', JSON.stringify(state.auth.roomName));
    return state.auth.roomName;
  });

  const [showId, setShowId] = useState(!room?.isJoining);

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
  }, []);

  const handleSubmit = (message, e) => {
    e.preventDefault();
    socket.emit('sendingMessage', {
      message,
      name: name,
      pic,
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
          <header className='msger-header'>
            <div className='msger-header-title'>
              <i className='fas fa-comment-alt'></i> {roomName} Room
            </div>
            <div className='msger-header-options'>
              <span>
                <i className='fas fa-cog'></i>
              </span>
            </div>
          </header>
          <MessageDiv socket={socket} />

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
