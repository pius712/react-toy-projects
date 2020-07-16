exports.isLoggedIn = (req,res,next)=>{
  if(req.user){
    next(); 
  }else{
    res.status(401).send('로그인이 필요합니다.');
  }
} 

exports.isNotLoggedIn = (req,res,next)=>{
  if(req.user){
    res.status(401).send('로그인된 상태입니다');
  }else{
    next();
  }
}