import React, { useState } from 'react';
import useStyles from './styles';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  ButtonBase,
} from '@material-ui/core';
import {
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';
import { useHistory } from 'react-router-dom';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import moment from 'moment';
import { Modal } from 'react-responsive-modal';
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost, commentPost } from '../../../actions/posts';
import swal from 'sweetalert';
// import './alert.css';
import 'react-responsive-modal/styles.css';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [comment, setComment] = useState(false);
  const [cvalue, setCValue] = useState('');
  const [c, setC] = useState(post.comments);
  const [share, setShare] = useState(false);

  const posts = useSelector((state) => {
    return state.posts;
  });

  const handleComment = (value, id) => {
    dispatch(commentPost(value, id));
    setCValue('');
  };

  const user = JSON.parse(localStorage.getItem('profile'));
  const title = `${post.title} written by ${post.name}. Checkout this awesome story at ${document.URL}!`;

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <FavoriteIcon color='secondary' fontSize='small' />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
        </>
      ) : (
        <>
          <FavoriteIcon color='secondary' fontSize='small' />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
        </>
      );
    }

    return (
      <>
        <FavoriteIcon color='secondary' fontSize='small' />
        &nbsp;Like
      </>
    );
  };
  const bg = {
    overlay: {
      background: '#FFFF00',
    },
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`);
  };
  return (
    <>
      <Card className={classes.card} raised elevation={8}>
        <CardMedia
          className={classes.media}
          image={
            post.selectedFile ||
            'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
          }
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post.name}</Typography>
          <Typography variant='body2'>
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.overlay2}>
          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button
              onClick={() => setCurrentId(post._id)}
              style={{ color: 'white' }}
              size='small'
            >
              <MoreHorizIcon fontSize='default' />
            </Button>
          )}
          <Button
            style={{ color: 'white' }}
            size='small'
            onClick={() => {
              // handleShare(post._id);
              setShare(!share);
            }}
          >
            <ShareIcon fontSize='default' />
          </Button>
          {share && (
            <Modal
              center
              open={share}
              onClose={() => {
                setShare(!share);
              }}
              classNames={{
                overlay: 'customOverlay',
                modal: 'customModal',
              }}
            >
              <h2
                style={{
                  textAlign: 'center',

                  fontFamily: 'Tahoma',
                }}
              >
                Share!
              </h2>
              <FacebookShareButton
                title={title}
                children={<FacebookIcon round={true} size={60} />}
                url={document.URL}
              />
              <WhatsappShareButton
                title={title}
                children={<WhatsappIcon round={true} size={60} />}
                url={document.URL}
              />
              <TwitterShareButton
                title={title}
                children={<TwitterIcon round={true} size={60} />}
                url={document.URL}
              />
              <LinkedinShareButton
                title={title}
                children={<LinkedinIcon round={true} size={60} />}
                url={document.URL}
              />
              <RedditShareButton
                title={title}
                children={<RedditIcon round={true} size={60} />}
                url={document.URL}
              />
            </Modal>
          )}
        </div>
        <ButtonBase className={classes.cardAction} onClick={openPost}>
          <div className={classes.details}>
            <Typography variant='body2' color='textSecondary'>
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography
            className={classes.title}
            color='secondary'
            variant='h5'
            gutterBottom
          >
            {post.title}
          </Typography>
          <CardContent>
            <Typography
              variant='body1'
              component='p'
              style={{ color: 'black' }}
            >
              {post.message.slice(0, 280)}
              {'...'}
              <Button variant='contained' color='secondary'>
                Read More
              </Button>
            </Typography>
          </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActions}>
          <Button
            size='small'
            disabled={!user?.result}
            onClick={() => {
              dispatch(likePost(post._id));
            }}
          >
            <Likes />
          </Button>
          <Button
            size='small'
            disabled={!user?.result}
            color='secondary'
            onClick={() => {
              setC(post.comments);
              // console.log(c);
              setComment(!comment);

              // console.log(comment);
            }}
          >
            <QuestionAnswerIcon color='secondary' /> &nbsp; &nbsp;
            {c.length}
            {comment && (
              <Modal
                center
                open={comment}
                onClose={() => {
                  setComment(!comment);
                }}
                classNames={{
                  overlay: 'customOverlay',
                  modal: 'customModal',
                }}
              >
                <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
                  Comments
                </h2>
                {c.map((comment, id) => {
                  return (
                    <p
                      key={id}
                      style={{
                        fontFamily: 'Tahoma',
                        fontWeight: 'bold',
                        color: 'black',
                        marginBottom: '8px',
                      }}
                    >
                      {comment}
                    </p>
                  );
                })}
                <br />
                <TextField
                  variant='outlined'
                  label='comment'
                  style={{
                    width: '75%',
                  }}
                  placeholder='Write your comment...'
                  value={cvalue}
                  onChange={(e) => {
                    setCValue(e.target.value);
                  }}
                />
                <Button
                  disabled={!cvalue.length}
                  color='primary'
                  variant='contained'
                  style={{
                    marginTop: '10px',
                    marginLeft: '10px',
                  }}
                  onClick={() => {
                    handleComment(`${user?.result?.name}: ${cvalue}`, post._id);
                  }}
                >
                  Comment
                </Button>
              </Modal>
            )}
          </Button>

          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button
              size='small'
              color='secondary'
              onClick={() => dispatch(deletePost(post._id))}
            >
              <DeleteIcon fontSize='small' /> Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
