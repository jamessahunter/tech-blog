const router = require('express').Router();
const { User, Post, Comment } = require('../models');
// Import the custom middleware
const {withAuth, areAuth } = require('../utils/auth');

router.get('/update/:id',withAuth, async(req,res)=>{
    try{
     const dbPostData = await Post.findByPk(req.params.id);
     const post = dbPostData.get({ plain: true });
 
     res.render('dashboard-update',{ post,loggedIn: req.session.loggedIn } );
   } catch (err) {
   console.log(err);
   res.status(500).json(err);
   }
 })
 
 router.get('/:id',  withAuth, async (req,res)=>{
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
 
 
 router.put('/:id', withAuth, (req,res)=>{
   Post.update(req.body,{
     where: {
       id:req.params.id,
     },
   })
   .then((post) => {
     return res.json(post);
   })
   .catch((err) => {
     res.status(400).json(err);
   });
 })
 
 router.delete('/:id', withAuth, async(req,res)=>{
   try{
     await Post.destroy({
       where:{
         id:req.params.id,
       }
     });
     res.status(200).json('Post Deleted');
   }catch{
     res.status(500).json(err);
   }
 
 
 })
 module.exports = router;