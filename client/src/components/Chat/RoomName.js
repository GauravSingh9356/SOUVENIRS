import React, { useRef, useState } from 'react';
import { Button, Paper, TextField } from '@material-ui/core';
import './roomname.css';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-responsive-modal';

import { useDispatch, useSelector } from 'react-redux';
import { createRoom, joinRoom } from '../../actions/chat';

const RoomName = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showInstructions, setShowInstructions] = useState(true);

  const roomRef = useRef();
  const joinRef = useRef();

  return (
    <Paper className='container' elevation={16}>
      {showInstructions && (
        <Modal
          center
          open={showInstructions}
          onClose={() => {
            setShowInstructions(!showInstructions);
          }}
          classNames={{
            overlay: 'customOverlay',
            modal: 'customModal',
          }}
        >
          <h1
            style={{
              textAlign: 'center',
              marginBottom: '15px',
            }}
          >
            Note
          </h1>
          <h4 style={{ fontFamily: 'Tahoma' }}>
            All the Rooms are dynamically made, destroyed and are fully
            encrypted. We don't store any data. We respect our user's privacy.
            Enjoy :)
          </h4>
          <h3
            style={{
              textAlign: 'center',
              marginTop: '15px',
              fontFamily: 'Tahoma',
            }}
          >
            Souvenirs 2021
          </h3>
        </Modal>
      )}
      <h1 style={{ color: 'black', textAlign: 'center' }}>Chat Room</h1>
      <form style={{ textAlign: 'center' }}>
        <TextField
          variant='outlined'
          label='Enter the Room Name'
          type='text'
          inputRef={roomRef}
          style={{ color: 'red' }}
        />
        <br />
        <br />

        <Button
          onClick={() =>
            dispatch(createRoom(roomRef.current.value.trim(), history))
          }
          variant='contained'
          color='primary'
        >
          Create
        </Button>
        <br />
        <br />

        <div style={{ fontSize: '24px' }}>OR</div>
        <br />

        <TextField
          variant='outlined'
          label='Enter Unique Room ID'
          type='text'
          style={{ color: 'red' }}
          inputRef={joinRef}
        />
        <br />
        <br />

        <Button
          onClick={() =>
            dispatch(joinRoom(joinRef.current.value.trim(), history))
          }
          variant='contained'
          color='primary'
        >
          Join
        </Button>
      </form>
    </Paper>
  );
};

export default RoomName;
