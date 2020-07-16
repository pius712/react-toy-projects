const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');
const db = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')

// login
router.post('/login', isNotLoggedIn, (req,res,next)=>{
  passport.authenticate('local', (err, user, info)=>{
    if(err){
      console.error(err);
      return next(err);
    }
    if(info){
      return res.status(401).send(info.message);
    }
    req.login(user, async (err)=>{
      if(err){
        console.error(err);
        return next(err);
      }
      // join 해서 만들어준 모델
      const userWithoutPassword = await User.findOne({
        where:{
          id: user.id
        },
        // attribute: ['id','email','nickname'],
        attributes: {
          exclude: ['password']
        },
        include:[{
          model: db.Post
        },{
          model: db.User,
          as: 'Followings'
        },{
          model: db.User,
          as: 'Followers'
        }]
      })
      return res.status(200).json(userWithoutPassword);
    })
  })(req,res,next);
})

// logout
router.post('/logout', isLoggedIn, (req,res,next)=>{
  req.logOut();
  req.session.destroy();
  res.send('log out success');
})
// GET /user 
router.get('/', async (req,res,next)=>{
  try{
    if(req.user){
      const userWithoutPassword = await User.findOne({
        where:{
          id: req.user.id
        },
        // attribute: ['id','email','nickname'],
        attributes: {
          exclude: ['password']
        },
        include:[{
          model: Post,
          attributes:['id']
        },{
          model: User,
          as: 'Followings',
          attributes: ['id']
        },{
          model: User,
          as: 'Followers',
          attributes: ['id']
        }]
      })
      res.status(200).json(userWithoutPassword);
    }else{
      res.status(200).json(null);
    }
  }catch(err){
    console.error(err);
    next(err);
  }
})
// POST /user 회원가입
router.post('/', isNotLoggedIn,async (req, res, next)=>{
  try{
    const exUser = await User.findOne({
      where: {
        email: req.body.email 
      }      
    })
    if(exUser){
      return res.status(403).send('already registered');
    }
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword
    });
    res.status(200).json()
  } catch(err){
    console.log(err);
    next(err);
  }  
})
module.exports = router; 