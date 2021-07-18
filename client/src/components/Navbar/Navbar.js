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
import memories from '../../images/pictures.png';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import 'react-responsive-modal/styles.css';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import decode from 'jwt-decode';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const Navbar = ({ handleDarkMode }) => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  let name = JSON.parse(localStorage.getItem('profile'));

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

  const toastShow = () => {
    toast.success(`Please SignUp or Login to Connect`, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleConnect = () => {
    toastShow();
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
          // style={{ display: `${window.innerWidth < 768 ? 'none' : 'block'}` }}
        >
          {window.innerWidth < 768 ? (
            <img src={memories} style={{ width: '40px', height: '40px' }} />
          ) : (
            'Souvenirs'
          )}
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
        <Button
          style={{
            marginLeft: '20px',
            // display: `${window.innerWidth < 697 ? 'none' : 'flex'}`,

            // color: 'black',
          }}
          variant='contained'
          color='secondary'
          onClick={handleDarkMode}
        >
          <Brightness4Icon
            style={{
              marginRight: '5px',
            }}
            src={memories}
            alt='memories'
            fontSize='default'
          />
          {window.innerWidth > 697 && 'Toggle'}
        </Button>
      </div>
      <Grid className={classes.toolbar}>
        <Button
          style={{ marginRight: '10px' }}
          variant='contained'
          color='primary'
          onClick={() =>
            name?.result?.name ? history.push('/choosechat') : handleConnect()
          }
        >
          <PeopleAltIcon
            fontSize='default'
            style={{ marginRight: `${window.innerWidth > 480 && '5px'}` }}
          />

          {window.innerWidth > 480 && 'Connect'}
        </Button>

        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result?.name}
              src={user.result?.imageUrl}
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
              <ExitToAppIcon
                style={{ marginRight: `${window.innerWidth > 480 && '5px'}` }}
              />
              {window.innerWidth > 480 && 'logout'}
            </Button>
          </div>
        ) : (
          <div>
            <Button
              // component={Link}
              onClick={() => history.push('/auth')}
              variant='contained'
              color='primary'
              className={classes.logout}
            >
              <LockOpenIcon
                style={{ marginRight: `${window.innerWidth > 480 && '5px'}` }}
              />

              {window.innerWidth > 480 && 'Sign In'}
            </Button>
          </div>
        )}
      </Grid>
    </AppBar>
  );
};

export default Navbar;
