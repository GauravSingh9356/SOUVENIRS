import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import Badge from 'react-simple-badges';

import { commentPost } from '../../actions/posts';

const CommentSection = ({ post }) => {
  //   console.log(post.comment);
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const commentRef = useRef();

  const handleSubmit = async () => {
    const finalComment = `${user.result.name}: ${comment}`;
    setComment('');
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComments(newComments);
    commentRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={classes.commentsOuterContainer}>
      <div className={classes.commentsInnerContainer}>
        <Typography gutterBottom variant='h6'>
          <Badge name='Comments' backgroundColor='#3f51b5' />

          <QuestionAnswerIcon style={{ marginLeft: '10px' }} color='primary' />
        </Typography>
        {comments.map((c, i) => (
          <Typography key={i} gutterBottom variant='subtitle1'>
            <strong>{c.split(': ')[0]}:</strong>
            {c.split(':')[1]}
          </Typography>
        ))}
        <div ref={commentRef}> </div>
      </div>
      {user?.result?.name && (
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant='h6'>
            <Badge name='Write a Comment' backgroundColor='#3f51b5' />
          </Typography>
          <TextField
            fullWidth
            rows={4}
            variant='outlined'
            label='comment'
            multiline
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            variant='contained'
            color='primary'
            disabled={!comment}
            onClick={handleSubmit}
          >
            Comment
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
