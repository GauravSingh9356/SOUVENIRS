const { findByIdAndUpdate } = require('../models/postMessage');
const PostMessage = require('../models/postMessage');

const getPost = async (req, res) => {
  try {
    // console.log('Her in get post');
    const { id } = req.params;
    // console.log(id);
    const post = await PostMessage.findById(id);
    res.json(post);
  } catch (error) {
    res.status(404).json({ message: 'Cannot get Desired post' });
  }
};

const getPosts = async (req, res) => {
  try {
    const { page } = req.query;
    const LIMIT = 9;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await PostMessage.countDocuments();

    let posts = PostMessage.find();
    posts.sort('-_id');
    posts.skip(startIndex).limit(LIMIT);
    posts = await posts;

    // console.log(postMessages);
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
    console.log('Successfully sent data');
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getPostsBySearch = async (req, res) => {
  try {
    const { searchQuery, tags } = req.query;
    const title = new RegExp(searchQuery, 'i');
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(',') } }],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    // console.log(req.body);
    const newPost = { ...req.body, message: req.body.message.blocks[0].text };

    const post = await PostMessage.create({
      ...newPost,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });
    res.status(201).json(post);
  } catch (error) {
    console.log('Error in creating post ', error.message);
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const data = req.body;
  try {
    const post = await PostMessage.findById(id);
    if (!post) {
      res.status(404).send('Error');
    } else {
      const updatedPost = await PostMessage.findByIdAndUpdate(id, data, {
        new: true,
      });
      //  console.log(updatedPost);
      res.status(200).json(updatedPost);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    await PostMessage.findByIdAndDelete(id);
    res.json({ message: 'Deletion Done' });
  } catch (error) {
    console.log(error);
  }
};

const likePost = async (req, res) => {
  try {
    console.log('In here');
    const { id } = req.params;
    if (!req.userId) {
      return res.json({ message: 'Unauthenticated' });
    }
    const post = await PostMessage.findById(id);
    const index = post.likes.findIndex((id) => id == String(req.userId));
    if (index == -1) {
      post.likes.push(req.userId);
    } else {
      post.likes = post.likes.filter((id) => {
        return id != String(req.userId);
      });
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    console.log('Done like Count');
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    // console.log(value, req.body);
    const post = await PostMessage.findById(id);
    post.comments.push(value);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
      new: true,
    });
    // console.log('Done commenting', updatedPost);
    res.json(updatedPost);
  } catch (error) {
    console.log('eror in backend');
  }
};

module.exports = {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
  getPostsBySearch,
};
