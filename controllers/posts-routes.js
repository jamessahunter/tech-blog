const router = require('express').Router();
const {  Post, Comment } = require('../models');
// Import the custom middleware
const {withAuth } = require('../utils/auth');
//gets the post of a specific id update
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
 
 //gets a specific post by id
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
 
 //updates a specfic post based on id
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
 
 //deletes a post with specific id
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