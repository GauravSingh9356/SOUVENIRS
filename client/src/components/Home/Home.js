import React, { useEffect, useState } from 'react';
import {
  Container,
  AppBar,
  Grow,
  Grid,
  Typography,
  Paper,
  Button,
  TextField,
} from '@material-ui/core';
import Pagination from '../Pagination';
import ChatInput from 'material-ui-chip-input';
import useStyles from './styles';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

// import useStyles from '../../styles';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const classes = useStyles();

  let user = JSON.parse(localStorage.getItem('profile')) || null;
  user = user?.showEmailVerification || false;
  let name = JSON.parse(localStorage.getItem('profile'));
  // console.log(name);
  // const [showModal, setShowModal] = useState(user);
  let showLogin =
    JSON.parse(localStorage.getItem('profile'))?.showLoginMessage || false;

  // useEffect(() => {
  //   // user = JSON.parse(localStorage.getItem('profile')) || null;
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  const searchPost = () => {
    if (search.trim() || tags) {
      //dispatch to fetch the post

      dispatch(
        getPostsBySearch({ search: search.trim(), tags: tags.join(',') })
      );
      history.push(
        `/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`
      );
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode == 13) {
      //search post
      searchPost();
    }
  };

  const toastSuccess = () => {
    toast.success('Login Successful!', {
      position: 'top-center',
      autoClose: 5000,
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
  };

  const toastInfo = () => {
    toast.success(
      `Confirmation Email has been sent to your email ${name?.result?.name}!`,
      {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          const data = JSON.parse(localStorage.getItem('profile'));
          localStorage.setItem(
            'profile',
            JSON.stringify({ ...data, showEmailVerification: false })
          );
        },
      }
    );
  };
  const toastShow = () => {
    toast.success(`Please SignUp or Login to Connect`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleConnect = () => {
    toastShow();
    history.push('/');
  };

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag != tagToDelete));
  };

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <div style={{ marginLeft: '40%', marginBottom: '20px' }}>
          <Button
            variant='contained'
            color='primary'
            onClick={() =>
              name?.result?.name ? history.push('/choosechat') : handleConnect()
            }
          >
            Connect
          </Button>
        </div>

        {showLogin && toastSuccess()}
        {user && toastInfo()}
        <Grid
          className={classes.mainContainer}
          container
          justify='space-between'
          alignItems='stretch'
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position='static'
              color='inherit'
            >
              <TextField
                name='search'
                variant='outlined'
                label='Search Souvenirs'
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <ChatInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label='Search Tags'
                variant='outlined'
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color='primary'
                variant='contained'
              >
                Search
              </Button>
            </AppBar>
            {/* <Form currentId={currentId} setCurrentId={setCurrentId} /> */}
            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={() => history.push(`/create`)}
            >
              Create
            </Button>
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
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
      </Container>
    </Grow>
  );
};

export default Home;
