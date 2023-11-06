const router = require('express').Router();
const { User, Post, Comment } = require('../models');
// Import the custom middleware
const {withAuth, areAuth } = require('../utils/auth');
// router.use(withAuth);
// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {

    const dbPostData = await Post.findAll();

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async(req,res)=>{
  try {
    const dbPostData = await Post.findAll({
      where:{ user_id:req.session.user_id}
    });

    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/dashboard/new', withAuth, async(req,res)=>{
  // console.log(req.session);
  res.render('dashboard-new');
})




router.get('/login', areAuth, (req, res) => {
  res.render('login');
});

router.get('/signup',(req,res)=>{
  res.render('signup');
})
module.exports = router;
