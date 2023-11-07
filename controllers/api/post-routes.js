const router = require('express').Router();
const { Post, Comment } = require('../../models');

// CREATE new post
router.post('/', async (req, res) => {
    try {
      const dbPostData = await Post.create({
        username: req.session.username,
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(dbPostData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.post('/comments', async (req, res) => {
    try {
      const dbCommentData = await Comment.create({
        username: req.session.username,
        content: req.body.content,
        post_id: req.body.id
      });
  
      req.session.save(() => {
        req.session.loggedIn = true;
        res.status(200).json(dbCommentData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


  module.exports = router;