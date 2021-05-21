import React, { useState } from 'react';
import SendIcon from '@material-ui/icons/Send';
import { Button } from '@material-ui/core';

import './style.css';

const Send = ({ handleSubmit }) => {
  const [message, setMessage] = useState('');

  return (
    <form className='msger-inputarea'>
      <input
        type='text'
        className='msger-input'
        placeholder='Enter your message...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        style={{ marginLeft: '10px' }}
        type='submit'
        variant='contained'
        color='secondary'
        onClick={(e) => {
          handleSubmit(message, e);
          setMessage('');
        }}
      >
        Send
        <SendIcon style={{ marginLeft: '5px' }} fontSize='large' />
      </Button>
    </form>
  );
};

export default Send;
