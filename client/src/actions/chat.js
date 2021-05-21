import * as api from '../api';
import { useHistory } from 'react-router-dom';

export const createRoom = (roomName, history) => async (dispatch) => {
  try {
    const { data } = await api.createRoom(roomName);
    // console.log(data[0].creator);
    console.log(data);
    if (data?.message) {
      dispatch({ type: 'ERROR', payload: data.message });
      history.push('/error');
    } else {
      data.newRoom.isJoining = false;
      dispatch({ type: 'CHAT', payload: data.newRoom });

      history.push(`/roomchat/:${roomName}`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const joinRoom = (roomPassword, history) => async (dispatch) => {
  try {
    const { data } = await api.joinRoom(roomPassword);
    // console.log(data[0].creator);
    console.log(data);
    if (data?.message) {
      dispatch({ type: 'ERROR', payload: data.message });
      history.push('/error');
    } else {
      data.existingRoom.isJoining = true;
      dispatch({ type: 'CHAT', payload: data.existingRoom });

      history.push(`/roomchat/:${data.existingRoom.name}`);
    }
  } catch (error) {
    console.log(error.message);
  }
};
