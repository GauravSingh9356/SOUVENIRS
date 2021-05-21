import React from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from '@material-ui/core';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Error = () => {
  const classes = useStyles();
  const history = useHistory();
  const errorMessage = useSelector((state) => {
    return state.auth.authData;
  });
  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} maxWidth='xs'>
        <Typography variant='h6' align='center'>
          {errorMessage}
        </Typography>
        <Button
          className={classes.button}
          align='center'
          color='secondary'
          variant='contained'
          onClick={() => history.push('/auth')}
        >
          Back
        </Button>
      </Paper>
    </Container>
  );
};

export default Error;
