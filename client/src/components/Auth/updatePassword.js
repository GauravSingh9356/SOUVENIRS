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

import { updatePasswords } from '../../actions/auth';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Input from './input';
import Icon from './icon';

import useStyles from './styles';

const updatePassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const id = document.URL.split('forgotPassword/')[1];
  console.log(id);

  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    dispatch(updatePasswords(password, id, history));
    setPassword('');
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'> Update Password</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <>
              <Input
                name='Password'
                label='Enter the new Password'
                value={password}
                handleChange={(e) => setPassword(e.target.value)}
                autoFocus
                fullWidth
              />
            </>
          </Grid>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Send
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default updatePassword;
