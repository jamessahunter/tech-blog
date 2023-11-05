const router = require('express').Router();
const { User, Post, Comment } = require('../models');
// Import the custom middleware
const {withAuth, areAuth } = require('../utils/auth');
// router.use(withAuth);
// GET all galleries for homepage
router.get('/', withAuth, async (req, res) => {
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

router.get('/post/update/:id',withAuth, async(req,res)=>{
   try{
    const dbPostData = await Post.findByPk(req.params.id);
    const post = dbPostData.get({ plain: true });

    res.render('dashboard-update',{ post,loggedIn: req.session.loggedIn } );
  } catch (err) {
  console.log(err);
  res.status(500).json(err);
  }
})

router.get('/post/:id',  withAuth, async (req,res)=>{
  try{
  const dbPostData = await Post.findByPk(req.params.id);
    const dbCommentData =await Comment.findAll({
      where: {post_id: req.params.id}
    })

  const post = dbPostData.get({ plain: true });
  const comments = dbCommentData.map((comment) =>
  comment.get({ plain: true }));

  res.render('post', { post, comments ,loggedIn: req.session.loggedIn });
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
})


router.get('/login', areAuth, (req, res) => {
  res.render('login');
});

router.get('/signup',(req,res)=>{
  res.render('signup');
})
module.exports = router;
