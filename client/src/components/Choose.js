import { Button, Paper } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DuoIcon from '@material-ui/icons/Duo';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';
const Choose = () => {
  const history = useHistory();
  return (
    <div className='main' style={{ padding: '80px' }}>
      <h2
        style={{
          fontWeight: 'bold',
          border: '4px solid black',
          marginBottom: '15px',
        }}
      >
        Choose
      </h2>

      <Button
        variant='contained'
        color='primary'
        onClick={() => history.push('/roomname')}
      >
        <ChatIcon color='secondary' fontSize='default' />
        Chat Room
      </Button>
      <Button
        style={{ marginTop: '10px' }}
        variant='contained'
        color='primary'
        onClick={() =>
          window.location.assign('https://souvenirsvideochat.netlify.app')
        }
      >
        <DuoIcon color='secondary' fontSize='default' />
        Peer to Peer Video Chat
      </Button>
    </div>
  );
};

export default Choose;
