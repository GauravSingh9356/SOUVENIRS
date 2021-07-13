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
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './input';
import Icon from './icon';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth';

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData)
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const switchMode = () => {
    setIsSignup(!isSignup);
    setShowPassword(!showPassword);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;

    const token = res?.tokenId;
    try {
      dispatch({
        type: 'AUTH',
        payload: { result, token, showLoginMessage: true },
      });
      history.push('/');
    } catch (error) {}
  };
  const googleFailure = () => {
    console.log('Google Sign in was unsuccessful! Try again');
  };

  const handleForgotPassword = () => {
    history.push('/auth/forgotPassword');
    // dispatch(forgetPassword());
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'SignUp' : 'SignIn'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  value={formData.firstName}
                  handleChange={handleChange}
                  autoFocus
                  half
                />

                <Input
                  name='lastName'
                  label='Last Name'
                  value={formData.lastName}
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name='email'
              label='Email Address'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                label='Repeat Password'
                handleChange={handleChange}
                type='password'
              />
            )}
          </Grid>
          {!isSignup && (
            <Button
              variant='contained'
              color='secondary'
              className={classes.submit}
              fullWidth
              onClick={handleForgotPassword}
            >
              Forgot Password
            </Button>
          )}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId='1038014047773-5fbpkhki42ktevnvpa1u1280arr5lrk4.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color='secondary'
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />

          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Already have a account? Sign In'
                  : "Don't have a account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
