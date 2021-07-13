import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);
    // console.log(data);
    if (!data?.message) {
      data.showLoginMessage = true;
      dispatch({ type: 'AUTH', payload: data });
      history.push('/');
    } else {
      dispatch({ type: 'ERROR', payload: data.message });
      history.push('/error');

      console.log('here');
    }
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    let { data } = await api.apiCall(formData.email);
    let { format_valid, mx_found, smtp_check } = data;
    // console.log(data);
    if (format_valid && mx_found && smtp_check) {
      const { data } = await api.signup(formData);
      if (!data?.message) {
        data.showEmailVerification = true;
        dispatch({ type: 'AUTH', payload: data });
        history.push('/');
      } else {
        dispatch({ type: 'ERROR', payload: data.message });
        history.push('/error');

        console.log('here');
      }
    } else if (!format_valid) {
      dispatch({ type: 'ERROR', payload: 'Please check your email format!' });
      history.push('/error');
    } else if (!mx_found || !smtp_check) {
      dispatch({
        type: 'ERROR',
        payload: 'No email found in real-time with this address',
      });
      history.push('/error');
    } else {
      dispatch({
        type: 'ERROR',
        payload:
          'Something went wrong!. Please check your internet connection.',
      });
      history.push('/error');
    }
    // }
  } catch (error) {
    console.log(error);
  }
};

export const forgetPassword = (email, history) => async (dispatch) => {
  try {
    let { data } = await api.forgetPassword(email);
    console.log(data);
    if (!data?.message) {
      history.push('/auth/forgotPassword');
      return true;
    } else {
      dispatch({
        type: 'ERROR',
        payload: 'No User Found with this email address!',
      });
      history.push('/error');
    }
  } catch (error) {
    dispatch({
      type: 'ERROR',
      payload: 'Some Error Occurred!',
    });
    history.push('/error');
  }
};

export const updatePasswords =
  (password, hashed, history) => async (dispatch) => {
    try {
      const { data } = await api.updatePassword(password, hashed);
      if (!data?.message) {
        history.push('/success');
      } else {
        dispatch({
          type: 'ERROR',
          payload: 'No User with this token OR the Link is Expired!',
        });
        history.push('/error');
      }
    } catch (error) {
      dispatch({
        type: 'ERROR',
        payload: 'Some error occurred!',
      });
      history.push('/error');
    }
  };
