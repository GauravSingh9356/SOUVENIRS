const authReducer = (state = { authData: null }, action) => {
  if (action.type == 'AUTH') {
    // console.log(action?.payload);
    localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
    return { ...state, authData: action?.payload };
  }
  if (action.type == 'LOGOUT') {
    localStorage.clear();
    return { ...state, authData: null };
  }
  if (action.type == 'ERROR') {
    return { ...state, authData: action.payload };
  }

  if (action.type == 'CHAT') {
    return { ...state, roomName: action.payload };
  }
  return state;
};

export default authReducer;
