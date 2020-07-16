const passport = require('passport');
const bcrypt = require('bcrypt');

const {Strategy: LocalStrategy} = require('passport-local');
const {User} = require('../models');

module.exports = ()=>{
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done)=>{
    try{
      const user = await User.findOne({
        where:{
          email
        }
      });
      if(!user){
        return done(null,false,{message: '존재하지 않는 유저'});
      }
      const result = await bcrypt.compare(password, user.password);
      if(result){
        return done(null, user)
      }
      return done(null, false, {message: '틀린 비밀번호'});
    }catch(err){
      console.log(err);
      return done(err);
    }
    
  }));
}