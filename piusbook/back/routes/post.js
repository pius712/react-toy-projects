const express = require('express');
const { Op } = require('sequelize');
const {User, Post, Comment, Image,Hashtag } = require('../models')
const {isLoggedIn} = require('./middlewares');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

try{
  fs.accessSync('uploads');
}catch(error){
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req,file,cb){
      cb(null, 'uploads')      
    },
    filename(req,file,cb){
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      cb(null, basename+ '_' +Date.now()+ext);
    },
  }),
  limits: {
    fileSize : 20 * 1024 * 1024
  }
})
router.post('/images', upload.array('image',5) ,isLoggedIn, async(req,res,next)=>{
  console.log(req.files);
  res.json(req.files.map(file=> file.filename));
})
// 게시글 작성 POST /post
router.post('/',  isLoggedIn, upload.none(), async (req,res,next)=>{
  try{
    // console.log("post", res.body.content,req.user.id);
    // 기본적인 포스트에 대한 데이터
    const hashtags = req.body.content.match(/#[a-z]+/gi);
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    })
    if(req.body.image){
      if(Array.isArray(req.body.image)){
        const images = await Promise.all(req.body.image.map(image => Image.create({src: image})))
        await post.addImages(images);
      }else{
        const image = await Image.create({src: req.body.image});
        await post.addImage(image);
      }
    }
    console.log(hashtags);
    if(hashtags){
      const results = await Promise.all(hashtags.map(hashtag =>{
        const tag = hashtag.slice(1).toLowerCase();
        return Hashtag.findOrCreate({ where: { name: tag }})}));
      await post.addHashtags(results.map(result => result[0]));
    }
    const fullPost = await Post.findOne ({
      where: {
        id: post.id
      },
      include:[{
        model: User, // Post 작성 User
        attributes: ['id','nickname']
      },{
        model: Post,
        as: 'Retweet'
      },{
        model: Comment,
        include:[{
          model: User,  // 댓글 작성 User
          attributes: ['id','nickname']
        }]
      },{
        model: Image
      },{
        model: User, // 좋아요 누른 User
        as: 'Likers',
        attributes: ['id']        
      }]
    })
    res.status(201).json(fullPost); 
  }catch(err){
    console.error(err);
    next(err);
  }
})

// 게시글 삭제
router.delete('/:postId/delete',isLoggedIn, async (req,res,next)=>{
  try{
    await Post.destroy({
      where: {
        id: req.params.postId, 
        UserId: req.user.id
      }
    })
    res.json({PostId: parseInt(req.params.postId)})
  }catch(err){
    console.error(err);
    next(err);
  }
})

// 게시글 수정
router.patch('/:postId/edit', isLoggedIn,async(req,res,next)=>{
  try{
    await Post.update({
      content: req.body.content
    },{
      where: {
        id: req.params.postId
      }
    })  
  }catch(err){
    console.error(err);
    next(err);
  }
})
// 댓글 업로드
router.post('/:id/comment',isLoggedIn, async(req,res,next)=>{
  try{
    
    const postId = req.params.id;
    const post = await Post.findOne({where:{id: postId}});
    console.log("!!")
    if(post){
      console.log('??')
      // console.log(res.body.content, postId, req.user.id);
      
      const comment = await Comment.create({
        content: req.body.content,
        PostId: parseInt(postId),
        UserId: req.user.id
      })
      console.log('comment', comment)
      const fullComment = await Comment.findOne({
        where: {
          id: comment.id
        },
        include:[{
          model: User,
          attributes: ['id','nickname']
        },{
          model: Post
        }]
      })
      return res.status(201).json(fullComment);
    }else{
      return res.status(403).send('존재하지 않는 게시글')
    }
  }catch(err){
    console.error(err);
    next(err);
  }
})

// 게시글 불러오기
router.get('/', async(req,res,next)=>{
  try{
    const where = {};
    if(parseInt(req.query.lastId)){
      where.id = {
        [Op.lt]: parseInt(req.query.lastId) 
      }
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order:[['createdAt','DESC'],[Comment, 'createdAt', 'DESC']],
      include: [{
        model: User,
        attributes: {
          exclude: ['password']
        }
      },{
        model: Image
      },{
        model: Comment,
        include: [{
          model: User,
          attributes:['id','nickname'],
        }]
      },{
        model: User, // 좋아요 누른 User
        as: 'Likers',
        attributes: ['id']        
      },{
        model: Post,
        as: 'Retweet',
        include:[{
          model: User,
          attributes: ['id', 'nickname']
        },{
          model: Image
        }]
      }
    ]
    });
    res.status(200).json(posts);
  }catch(err){
    console.error(err);
    next(err);
  }
})
// 게시글 하나 가져오기

router.get('/:id', isLoggedIn, async(req,res,next)=>{
  try{
    const post = await Post.findOne({
      where: {
        id: req.params.id
      }
    });
    if(!post){
      return res.status(403).send("존재하지 않는 페이지입니다.");
    }
    const fullPost = await Post.findOne ({
      where: {
        id: post.id
      },
      include:[{
        model: User, // Post 작성 User
        attributes: ['id','nickname']
      },{
        model: Post,
        as: 'Retweet'
      },{
        model: Comment,
        include:[{
          model: User,  // 댓글 작성 User
          attributes: ['id','nickname']
        }]
      },{
        model: Image
      },{
        model: User, // 좋아요 누른 User
        as: 'Likers',
        attributes: ['id']        
      }]
    })
res.status(201).json(fullPost); 
  }catch(err){
    console.error(err);
    next(err);
}
})
// 좋아요 버튼
router.patch('/:id/like',isLoggedIn, async(req,res,next)=>{
  const post = await Post.findOne({
    where: {
      id: req.params.id
    }
  });
  if(post){
    await post.addLikers(req.user.id);
    return res.json({PostId: post.id,
      UserId: req.user.id});
  }else{
    return res.status(403).send('해당 게시글이 존재하지 않습니다.');
  }
})
// 좋아요 버튼 취소
router.patch('/:id/unlike', isLoggedIn,async (req,res,next)=>{
  const post = await Post.findOne({
    where: {
      id: req.params.id
    }
  });
  if(post){
    await post.removeLiker(req.user.id);
    return res.json({PostId: post.id,
    UserId: req.user.id})
  }else{
    return res.status(403).send('해당 게시글이 존재하지 않습니다');
  }
})
// 리트윗
router.post('/:postId/retweet', isLoggedIn, async(req,res,next)=>{
  try{
    // postId => 리트윗 할 게시글 
    const post = await Post.findOne({
      where: {
        id: req.params.postId
      },
      include: [{
        model: Post,
        as: 'Retweet'
      }]
    })
    if(!post){
      return res.status(403).send('해당 게시글이 존재하지 않습니다.');
    }
    // 자기 게시글 리트윗 || 자기 게시글을 리트윗한 글을 리트윗 하는 것
    if(post.UserID === req.user.id || (post.Retweet && post.Retweet.UserId === req.user.id)){
      return res.status(403).send('자신의 글은 retweet 할 수 없습니다.');
    }
    // 만약 그 글이 리트윗을 한 게시글이면, 그 원 글의 id || 그게 아니면 그 post의 id
    const retweetPostId = post.RetweetId || post.id;
    const isPrevRetweet = await Post.findOne({
      where:{
        UserId: req.user.id,
        RetweetId: retweetPostId,
      }
    });
    if(isPrevRetweet){
      return res.status(403).send('이미 리트윗한 글입니다.');
    }
    const retweetPost = await Post.create({
      UserId: req.user.id,
      RetweetId: retweetPostId,
      content: 'retweet'
    })
    const retweetPostWithRetweeted = await Post.findOne({
      where:{
        id: retweetPost.id,
      },
      include: [{
        model: Post,
        as: 'Retweet',
        include:[{
          // 리트윗할 게시글의 User 정보
          model:User,
          attributes: ['id','nickname']
        },{
          model: Image
        }]
      },{
        // 리트윗하는 사람의 정보,
        model: User,
        attributes: ['id','nickname']
      },{
        model: Image
      },{
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }]
      },{
        model: User, // 좋아요 누른 User
        as: 'Likers',
        attributes: ['id']        
      }]
    })
    res.status(201).json(retweetPostWithRetweeted);
  }catch(err){
    console.error(err);
    next(err);
  }
})
module.exports = router; 