const router = require('express').Router();
const { Post } = require('../models');
// Import the custom middleware
const {withAuth } = require('../utils/auth');

// GET all posts for homepage
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

//gets all post for the current user
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

//renders the dashboard to add a new post
router.get('/dashboard/new', withAuth, async(req,res)=>{
  res.render('dashboard-new');
})

//gets the login page
router.get('/login', areAuth, (req, res) => {
  res.render('login');
});

//gets the signup page
router.get('/signup',(req,res)=>{
  res.render('signup');
})
module.exports = router;
