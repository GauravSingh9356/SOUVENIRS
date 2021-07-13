import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from '@material-ui/core';
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import Badge from 'react-simple-badges';
import Linkify from 'react-linkify';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';
import useStyles from './styles';
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import EditIcon from '@material-ui/icons/Edit';

import ShareIcon from '@material-ui/icons/Share';
import {
  EmailShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from 'react-share';
import {
  EmailIcon,
  LinkedinIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from 'react-share';
import { Modal } from 'react-responsive-modal';
import './style.css';


const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem('profile'));

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const [share, setShare] = useState(false);
  var message;
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: 'none', tags: post?.tags.join(',') })
      );
      console.log(post.message);
      message = parse(`${post.message}`);
      console.log(message);
    }
  }, [post]);

  if (!post) return null;
  if (isLoading)
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size='7em' />
      </Paper>
    );

  const openPost = (_id) => {
    history.push(`/posts/${_id}`);
  };

  const recommendedPosts = posts?.filter(({ _id }) => _id != post._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <Button
        variant='contained'
        color='primary'
        onClick={() => history.push('/posts')}
      >
        Back
      </Button>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant='h3' component='h3'>
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            color='textSecondary'
            component='h6'
            style={{ fontSize: '17px' }}
          >
            {post.tags.map(
              (tag, i) => (
                <Badge key={i} name={`#${tag} `} backgroundColor='#3f51b5' />
              )
              // tag
            )}
          </Typography>
          <Typography
            gutterBottom
            variant='body1'
            component='p'
            style={{ color: 'black', width: '100%' }}
          >
            <div
              style={{
                border: '2px solid black',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              <Linkify
                componentDecorator={(decoratedHref, decoratedText, key) => (
                  <a
                    style={{ color: 'red', width: '100%' }}
                    target='_blank'
                    href={decoratedHref}
                    key={key}
                  >
                    {decoratedText}
                  </a>
                )}
              >
                <div dangerouslySetInnerHTML={{ __html: post.message }} />
              </Linkify>
            </div>
          </Typography>
          <Typography variant='h5'>
            <Badge name='Creator' backgroundColor='#f50057' />{' '}
            <Badge name={post.name} backgroundColor='#32a853' />
          </Typography>
          <Typography variant='body1' style={{ color: 'black' }}>
            <Badge
              name={moment(post.createdAt).fromNow()}
              backgroundColor='#f50057'
            />
          </Typography>

          {(user?.result?.googleId === post?.creator ||
            user?.result?._id === post?.creator) && (
            <Button
              onClick={() => history.push(`/create/${post._id}`)}
              color='primary'
              variant='contained'
            >
              Edit
              <EditIcon style={{ margin: '4px' }} />
            </Button>
          )}

          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              setShare(!share);
            }}
            style={{
              margin: `${
                user?.result?.googleId === post?.creator ||
                user?.result?._id === post?.creator
                  ? '10px'
                  : '0px'
              }`,
            }}
          >
            Share
            <ShareIcon variant='contained' style={{ margin: '4px' }} />
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
              <div style={{ padding: '20px' }}>
                <RedditShareButton
                  title={`Check out this Awesome Story "${post.title}" by ${post.name}`}
                  children={<RedditIcon round={true} size={60} />}
                  url={document.URL}
                  style={{ marginLeft: '10px' }}
                />

                <WhatsappShareButton
                  title={`Check out this Awesome Story "${post.title}" by ${post.name}`}
                  children={<WhatsappIcon round={true} size={60} />}
                  url={document.URL}
                  style={{ marginLeft: '10px' }}
                />
                <TelegramShareButton
                  title={`Check out this Awesome Story "${post.title}" by ${post.name}`}
                  children={<TelegramIcon round={true} size={60} />}
                  url={document.URL}
                  style={{ marginLeft: '10px' }}
                />
                <EmailShareButton
                  title={`Check out this Awesome Story "${post.title}" by ${post.name}`}
                  children={<EmailIcon round={true} size={60} />}
                  url={document.URL}
                  style={{ marginLeft: '10px' }}
                />
                <TwitterShareButton
                  title={`Check out this Awesome Story "${post.title}" by ${post.name}`}
                  children={<TwitterIcon round={true} size={60} />}
                  url={document.URL}
                  style={{ marginLeft: '10px' }}
                />

                <LinkedinShareButton
                  title={`Check out this Awesome Story "${post.title}" by ${post.name}`}
                  children={<LinkedinIcon round={true} size={60} />}
                  url={document.URL}
                  style={{ marginLeft: '10px' }}
                />
              </div>
            </Modal>
          )}

          {/* <Divider style={{ margin: '20px 0' }} />
        <Typography variant='body1'>
          <strong>Realtime Chat - coming soon!</strong>
        </Typography> */}
          {/* <Divider style={{ margin: '20px 0' }} /> */}
          <div
            style={{
              border: '2px solid black',
              margin: '20px 0',
              padding: '10px',
              borderRadius: '5px',
            }}
          >
            <CommentSection post={post} />
          </div>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img
            className={classes.media}
            src={
              post.selectedFile ||
              'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            }
            alt={post.title}
            style={{ marginTop: '80px' }}
          />
        </div>
      </div>
      {recommendedPosts.length == 0 ? (
        ''
      ) : (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'>
            <Badge name='You might also like:' backgroundColor='#3f51b5' />
          </Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <div
                  className='recomm'
                  key={_id}
                  style={{
                    margin: '20px',
                    padding: '10px',
                    cursor: 'pointer',
                    flex: 0.3,
                    flexDirection: 'column',
                  }}
                  onClick={() => openPost(_id)}
                >
                  <Typography gutterBottom variant='h4'>
                    <Badge
                      name={title}
                      backgroundColor='#f50057'
                      style={{ width: '500', height: '500' }}
                    />
                  </Typography>
                  <Typography gutterBottom variant='subtitle2'>
                    <Badge name={`By: ${name}`} backgroundColor='#32a853' />
                  </Typography>
                  <Typography gutterBottom variant='subtitle2'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: message.slice(0, 181),
                      }}
                    />
                  </Typography>
                  <Typography gutterBottom variant='subtitle1'>
                    <Badge
                      name={`Likes: ${likes.length}`}
                      backgroundColor='#3f51b5'
                    />
                  </Typography>
                  <img src={selectedFile} width='200px' />
                </div>
              )
            )}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
