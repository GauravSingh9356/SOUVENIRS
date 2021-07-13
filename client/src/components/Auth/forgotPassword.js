import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
  TextField,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { forgetPassword } from '../../actions/auth';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from './input';
import Icon from './icon';

import useStyles from './styles';

const forgotPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const classes = useStyles();
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(forgetPassword(email, history));
    setEmail('');
    if (success) {
      setShow(!show);
    }

    setTimeout(() => {
      history.push('/auth');
    }, 5000);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{show && 'Forget Password'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {show ? (
              <>
                <Input
                  name='Email'
                  label='Enter your Email Address'
                  value={email}
                  handleChange={(e) => setEmail(e.target.value)}
                  autoFocus
                  fullWidth
                />
              </>
            ) : (
              <div
                style={{
                  border: '6px solid #f50057',
                  textAlign: 'center',
                  borderRadius: '5px',
                  padding: '10px',
                  fontSize: '22px',
                }}
              >
                Unique token link is sent to registered email.
              </div>
            )}
          </Grid>

          {show && (
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Send
            </Button>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default forgotPassword;
