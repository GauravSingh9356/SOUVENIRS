import React from 'react';
import Post from './Post/Post';
import useStyles from './styles';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import HashLoader from 'react-spinners/ClipLoader';

const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => {
    console.log(state.posts);
    return state.posts;
  });
  // console.log(posts, typeof posts);
  // console.log(posts.length);

  if (!posts.length && !isLoading) return 'No Posts!';
  return isLoading ? (
    <div
      style={{
        textAlign: 'center',
        marginRight: `${window.innerWidth < 768 ? '100px' : '0px'} `,
        marginTop: '35px',
      }}
    >
      <HashLoader size={window.innerWidth < 768 ? 101 : 151} color='#ff0000' />
    </div>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems='stretch'
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
