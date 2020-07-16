const passport = require('passport');
const local = require('./local');
const {User} = require('../models');
module.exports = ()=>{
  passport.serializeUser((user,done)=>{
    done(null, user.id);
  });

  passport.deserializeUser(async (id,done)=>{
    try{
      const exUser = await User.findOne({where:{ id: id}});
      return done(null, exUser);
    }catch(err){
      console.log(err);
      return done(err)
    }
  })
  local()
}