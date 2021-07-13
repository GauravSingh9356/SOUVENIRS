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
  EmailIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from 'react-share';
import Badge from 'react-simple-badges';
import { useHistory } from 'react-router-dom';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import moment from 'moment';
import { Modal } from 'react-responsive-modal';
import {
  EmailShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
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

  const [c, setC] = useState(post.comments);
  const [share, setShare] = useState(false);
  const [instruct, setInstruct] = useState(false);
  const [likes, setLikes] = useState(post?.likes);

  const posts = useSelector((state) => {
    return state.posts;
  });

  const test = (data) => {
    return (
      data.includes('hour') ||
      data.includes('hours') ||
      data.includes('seconds') ||
      data.includes('minutes')
    );
  };
  const url = `${document.URL}/${post._id}`;

  const user = JSON.parse(localStorage.getItem('profile'));
  const title = `Checkout this Awesome story "${post.title}" written by ${post.name}`;

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
              onClick={() => history.push(`/create/${post._id}`)}
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
            >
              <h2
                style={{
                  textAlign: 'center',

                  fontFamily: 'Tahoma',
                }}
              >
                Share!
              </h2>
              <div
                style={{
                  padding: '20px',
                }}
              >
                <RedditShareButton
                  title={title}
                  children={<RedditIcon round={true} size={60} />}
                  url={url}
                  style={{ marginLeft: '10px' }}
                />

                <WhatsappShareButton
                  title={title}
                  children={<WhatsappIcon round={true} size={60} />}
                  url={url}
                  style={{ marginLeft: '10px' }}
                />
                <TelegramShareButton
                  title={title}
                  children={<TelegramIcon round={true} size={60} />}
                  url={url}
                  style={{ marginLeft: '10px' }}
                />
                <EmailShareButton
                  title={title}
                  children={<EmailIcon round={true} size={60} />}
                  url={url}
                  style={{ marginLeft: '10px' }}
                />
                <TwitterShareButton
                  title={title}
                  children={<TwitterIcon round={true} size={60} />}
                  url={url}
                  style={{ marginLeft: '10px' }}
                />
                <LinkedinShareButton
                  title={title}
                  children={<LinkedinIcon round={true} size={60} />}
                  url={url}
                  style={{ marginLeft: '10px' }}
                />
              </div>
            </Modal>
          )}
        </div>
        <ButtonBase className={classes.cardAction} onClick={openPost}>
          <div className={classes.details}>
            <Typography variant='body2' color='textSecondary'>
              {post.tags.map((tag) => (
                <Badge name={`#${tag} `} backgroundColor='#3f51b5' />
              ))}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              {test(moment(post.createdAt).fromNow().split(' ')) && (
                <Badge name='New' backgroundColor='#32a853' />
              )}
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              {(post.comments.length >= 4 || post.likes.length >= 4) && (
                <Badge name='Hot' backgroundColor='#32a853' />
              )}
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
              <div
                dangerouslySetInnerHTML={{ __html: post.message.slice(0, 111) }}
              />
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
            style={{ color: 'red' }}
            // disabled={!user?.result}
            onClick={() => {
              if (!user?.result) {
                setInstruct(!instruct);
              } else dispatch(likePost(post._id));
            }}
          >
            <Likes />
          </Button>

          <Button
            size='small'
            color='secondary'
            disabled={true}
            style={{ color: 'red' }}
          >
            <QuestionAnswerIcon color='secondary' /> &nbsp; &nbsp;
            {c.length}
            {instruct && (
              <Modal
                centerTop
                open={instruct}
                onClose={() => {
                  setInstruct(!instruct);
                }}
                classNames={{
                  overlay: 'customOverlay',
                  modal: 'customModal',
                }}
              >
                <h3
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Tahoma',
                    padding: '25px',
                  }}
                >
                  Please Login to Connect!
                </h3>
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
