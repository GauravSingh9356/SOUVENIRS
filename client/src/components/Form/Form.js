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
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createPost, updatePost } from '../../actions/posts';
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  ContentState,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Badge from 'react-simple-badges';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const Form = () => {
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { currentId } = useParams();
  console.log(currentId);
  const [content, setContent] = useState('');

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
  console.log(post);

  useEffect(() => {
    if (post) {
      const contentBlock = htmlToDraft(post.message);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);

      // const editorState = stateToHTML(convertFromRaw(JSON.parse(post.message)));
      setEditorState(editorState);

      setPostData({ ...post, message: editorState });
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(
        updatePost(
          {
            ...postData,
            message: content,
            tags: postData.tags.map((tag) => tag.trim()),
            name: user?.result?.name,
          },
          currentId,
          history
        )
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
      dispatch(
        createPost(
          {
            ...postData,
            message: content,
            tags: postData.tags.map((tag) => tag.trim()),
            name: user?.result?.name,
          },
          history
        )
      );
      console.log(postData);


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
    setEditorState(EditorState.createEmpty());
  };
  const clear = () => {
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
          <Badge
            name={`${currentId ? 'Edit Blog/Memory' : 'Create Blog/Memory'}`}
            backgroundColor='#3f51b5'
          />
          {}
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
          name='tags'
          variant='outlined'
          label='Tags'
          fullWidth
          value={postData.tags}
          onChange={(e) => {
            setPostData({ ...postData, tags: e.target.value.split(',') });
          }}
        />

        <Editor
          // name='message'
          // multiline
          // rows={25}
          // variant='outlined'
          editorState={editorState}
          toolbarClassName='toolbarClassName'
          wrapperClassName='wrapperClassName'
          editorClassName='editorClassName'
          editorStyle={{
            border: '2px solid black',
            borderRadius: '8px',
            padding: '10px',
            minHeight: '400px',
          }}
          onEditorStateChange={(newState) => {
            setEditorState(newState);
            setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
          }}
          // toolbar={{
          //   options: [
          //     'inline',
          //     'blockType',
          //     'fontSize',
          //     'list',
          //     'textAlign',
          //     'history',
          //     'embedded',
          //     'emoji',
          //     'image',
          //     'link',
          //   ],
          //   inline: { inDropdown: true },
          //   list: { inDropdown: true },
          //   textAlign: { inDropdown: true },
          //   link: { inDropdown: false },
          //   history: { inDropdown: true },
          // }}
        />

        <div className={classes.fileInput} style={{ marginTop: '100px' }}>
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
