import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
} from '@material-ui/core';
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const location = useLocation();
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  // const user = JSON.parse(localStorage.getItem('profile'));

  const dispatch = useDispatch();
  const post = useSelector((state) => {
    if (currentId) {
      return state.posts.posts.find((p) => p._id == currentId);
    } else {
      return null;
    }
  });

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost({ ...postData, name: user?.result?.name }, currentId)
      );
      clear();
      toast.info('Post Updated!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          const data = JSON.parse(localStorage.getItem('profile'));
          localStorage.setItem(
            'profile',
            JSON.stringify({ ...data, showLoginMessage: false })
          );
        },
      });
    } else {
      console.log(postData);
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));

      toast.info('Post Created!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          const data = JSON.parse(localStorage.getItem('profile'));
          localStorage.setItem(
            'profile',
            JSON.stringify({ ...data, showLoginMessage: false })
          );
        },
      });
      clear();
    }
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      message: '',
      tags: [],
      selectedFile: '',
    });
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const classes = useStyles();

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant='h6' align='center'>
          Please Sign In to write your own blogs, create memories, like,
          comment, share on other's and Connect to Souvenirs World!.
        </Typography>
      </Paper>
    );
  }
  return (
    <Paper className={classes.paper} elevation={6}>
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
      <form
        autoComplete='off'
        className={`${classes.form} ${classes.root} `}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {currentId ? 'Edit Memory' : 'Create Memory'}
        </Typography>

        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={(e) => {
            setPostData({ ...postData, title: e.target.value });
          }}
        />

        <TextField
          name='message'
          multiline
          rows={5}
          variant='outlined'
          label='Message'
          fullWidth
          value={postData.message}
          onChange={(e) => {
            setPostData({ ...postData, message: e.target.value });
          }}
        />

        <TextField
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            setPostData({ ...postData, tags: e.target.value.split(',') });
          }}
        />
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) => {
              setPostData({ ...postData, selectedFile: base64 });
            }}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
