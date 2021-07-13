import * as api from '../api';

//Action creators

export const getPost = (id) => async (dispatch) => {
  try {
    console.log('hello');
    dispatch({ type: 'START_LOADING' });
    const { data } = await api.fetchPost(id);
    // console.log(data[0].creator);
    console.log(data);
    dispatch({ type: 'FETCH_POST', payload: data });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    console.log('hello');
    dispatch({ type: 'START_LOADING' });
    const { data } = await api.fetchPosts(page);
    // console.log(data[0].creator);
    console.log(data);
    dispatch({ type: 'FETCH_ALL', payload: data });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });

    const { data } = await api.createPost(post);
    dispatch({ type: 'CREATE', payload: data });
    history.push(`/posts/${data._id}`);

    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost =
  (postData, currentId, history) => async (dispatch) => {
    try {
      // console.log(postData);
      // console.log('hello');
      const { data } = await api.updatePost(postData, currentId);
      // console.log(data);
      dispatch({ type: 'UPDATE', payload: data });
      history.push(`/posts/${data._id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: 'DELETE', payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    console.log(data);
    dispatch({ type: 'LIKE', payload: data });
    console.log('No error');
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    console.log(data);
    dispatch({ type: 'COMMENT', payload: data });
    return data.comments;
  } catch (error) {
    console.log('Error in frontend');
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: 'START_LOADING' });

    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    console.log(data);
    dispatch({ type: 'FETCH_BY_SEARCH', payload: data });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    console.log(error);
  }
};
