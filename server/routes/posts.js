const express = require('express');
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  getPostsBySearch,
  getPost,
} = require('../controllers/posts');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/likepost/:id', auth, likePost);
router.post('/commentPost/:id', commentPost);

module.exports = router;
