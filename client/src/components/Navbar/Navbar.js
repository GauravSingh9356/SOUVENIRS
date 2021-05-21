import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  Avatar,
  Grid,
} from '@material-ui/core';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import memories from '../../images/memories.png';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-responsive-modal/styles.css';

import decode from 'jwt-decode';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/');
    setUser(null);

    toast.success('Logout Successful!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <AppBar
      className={classes.appBar}
      item
      xs='auto'
      sm='auto'
      md='auto'
      position='static'
      color='inherit'
    >
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to='/'
          className={classes.heading}
          variant={`${window.innerWidth < 870 ? 'h4' : 'h2'}`}
          align='center'
        >
          Souvenirs
        </Typography>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <img
          className={classes.image}
          style={{
            display: `${window.innerWidth < 870 ? 'none' : 'block'}`,
          }}
          src={memories}
          alt='memories'
          height='60'
        />
      </div>
      <Grid className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              eefe
              {user.result.name.charAt(0)}
            </Avatar>
            {window.innerWidth > 530 && (
              <Typography className={classes.userName} variant='h6'>
                {user.result.name}
              </Typography>
            )}
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={logout}
            >
              logout
            </Button>
          </div>
        ) : (
          <div>
            <Button
              component={Link}
              to='/auth'
              variant='contained'
              color='primary'
            >
              Sign In
            </Button>
          </div>
        )}
      </Grid>
    </AppBar>
  );
};

export default Navbar;
