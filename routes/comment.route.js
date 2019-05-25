const { Router } = require('express');
const passport = require('passport');
const isAuthenticated = require('../middlewares/authenticated');
const Comment = require('../models/Comment');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


const router = Router();

router.route('/test').get((req, res) => {
  console.log(req);
  res.send('Test successful');
});

router.route('/comments').post(isAuthenticated, async (req, res) => {
  const { body, author, commentOn} = req.body;
    const comment = await Comment.create({ body, author, commentOn})
    res.status(201).json(comment);
});

router.route('/comments/:id').put(isAuthenticated, async (req, res) => {
  const id = req.params.id
  const token = req.headers.authToken;
  const decoded = jwt.decode(token);
  const comment = await Comment.findById(id);
  if(decoded.username !== comment.author) {
    return res.status(403).json({
      message: 'Permission denied'
    })
  }

  const updatedComment = await Comment.findOneAndUpdate(id, req.body);

  return res.json(updatedComment);
});

router.route('/comments').get(async (req, res) => {
  const id = req.params.id;
  const token = req.headers.authToken;
  const decoded = jwt.decode(token);
  const user = await User.find({username:decoded.username});

  const comments = await Comment.find({author:user.username});
  res.json({comments});
});


module.exports = router;

