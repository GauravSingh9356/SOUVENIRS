import axios from 'axios';

const API = axios.create({ baseURL: 'https://memoriesbygs.herokuapp.com' });
// const url = 'http://localhost:4000/posts';
const api_key = 'f4591012666a7d09b5ec701e3d25fabb';

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }
  return req;
});
export const fetchPosts = (page) => {
  return API.get(`/posts?page=${page}`);
};
export const fetchPostsBySearch = (searchQuery) => {
  return API.get(
    `/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${
      searchQuery.tags
    }`
  );
};

export const createPost = (newPost) => {
  return API.post('/posts', newPost);
};

export const updatePost = (updatePost, currentId) => {
  return API.patch(`/posts/${currentId}`, updatePost);
};

export const deletePost = (id) => {
  return API.delete(`/posts/${id}`);
};

export const likePost = (id) => {
  return API.patch(`/posts/likepost/${id}`);
};

export const signin = (formData) => {
  return API.post('/users/signin', formData);
};
export const signup = (formData) => {
  return API.post('/users/signup', formData);
};

export const comment = (value, id) => {
  return API.post(`/posts/commentPost/${id}`, { value: value });
};

export const apiCall = (email) => {
  return axios.get(
    `https://apilayer.net/api/check?access_key=${api_key}&email=${email}`
  );
};

export const createRoom = (roomName) => {
  return API.post(`/createroom`, { roomName });
};

export const joinRoom = (roomPassword) => {
  return API.post(`/joinroom`, { pass: roomPassword });
};

export const fetchPost = (id) => {
  return API.get(`/posts/${id}`);
};
