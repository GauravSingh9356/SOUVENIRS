import React, { useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from '@material-ui/core';
import useStyles from './styles';
import { useHistory } from 'react-router-dom';

const Success = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/auth');
    }, 5000);
  });

  const classes = useStyles();
  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} maxWidth='xs'>
        <Typography variant='h6' align='center'>
          Success!
        </Typography>
        <div
          style={{
            padding: '10px',
            border: '6px solid green',
            borderRadius: '5px',
            fontSize: '22px',
            textAlign: 'center',
          }}
        >
          Your Password has been updated!
        </div>
      </Paper>
    </Container>
  );
};

export default Success;
