const router = require('express').Router();
const { Post } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
    try {
        console.log("title " + req.body.title);
        console.log("contet "+ req.body.content);
      const dbPostData = await Post.create({
        title: req.body.title,
        content: req.body.content,
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

  module.exports = router;