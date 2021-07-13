

export default (state = { isLoading: true, posts: [] }, action) => {
  if (action.type == 'START_LOADING') {
    return { ...state, isLoading: true };
  }

  if (action.type == 'END_LOADING') {
    return { ...state, isLoading: false };
  }

  if (action.type == 'CREATE') {
    return { ...state, posts: action.payload };
  }
  if (action.type == 'FETCH_ALL') {
    return {
      ...state,
      posts: action.payload.data,
      currentPage: action.payload.currentPage,
      numberOfPages: action.payload.numberOfPages,
    };
  }

  if (action.type == 'FETCH_POST') {
    return {
      ...state,
      post: action.payload,
      currentPage: action.payload.currentPage,
      numberOfPages: action.payload.numberOfPages,
    };
  }
  if (action.type == 'UPDATE') {
    return {
      ...state,
      posts: state.posts.map((post) => {
        if (post._id == action.payload._id) {
          return action.payload;
        }
        return post;
      }),
    };
  }
  if (action.type == 'DELETE') {
    return {
      ...state,
      posts: state.posts.filter((post) => {
        return post._id !== action.payload;
      }),
    };
  }

  if (action.type == 'LIKE') {
    return {
      ...state,
      posts: state.posts.map((post) => {
        if (post._id == action.payload._id) {
          return action.payload;
        }
        return post;
      }),
    };
  }

  if (action.type == 'COMMENT') {
    return {
      ...state,
      posts: state.posts.map((post) => {
        if (post._id == action.payload._id) {
          return action.payload;
        }
        return post;
      }),
    };
  }

  if (action.type == 'FETCH_BY_SEARCH') {
    return { ...state, posts: action.payload };
  }
  return state;
};
