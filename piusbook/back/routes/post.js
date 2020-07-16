const express = require('express');
const {User, Post, Comment, Image } = require('../models')
const router = express.Router();
const {isLoggedIn} = require('./middlewares')

// 게시글 작성 POST /post
router.post('/',  isLoggedIn, async (req,res,next)=>{
  try{
    // console.log("post", res.body.content,req.user.id);
    // 기본적인 포스트에 대한 데이터
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    })
    const fullPost = await Post.findOne({
      where: {
        id: post.id
      },
      include:[{
        model: User
      },{
        model: Post,
        as: 'Retweet'
      },{
        model: Comment,
      },{
        model: Image
      }]
    })
    res.status(201).json(fullPost); 
  }catch(err){
    console.error(err);
    next(err);
  }
})

router.delete('/', (req,res,next)=>{

})

// 댓글 업로드
router.post('/:id/comment',isLoggedIn, async(req,res,next)=>{
  try{
    
    const postId = req.params.id;
    const post = await Post.findOne({where:{id: postId}});
    if(post){
      const comment = await Comment.create({
        content: res.body.content,
        PostId: postId,
        UserId: req.user.id
      })
      return res.status(201).json(comment);
    }else{
      return res.status(403).send('존재하지 않는 게시글')
    }
  }catch(err){

  }
  
})
module.exports = router; 