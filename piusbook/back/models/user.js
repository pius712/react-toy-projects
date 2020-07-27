module.exports = (sequelize, DataTypes) => {
  
  const User = sequelize.define('User', {
    email:{
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    }
  },{
    charset: 'utf8',
    collate: 'utf8_general_ci'
  })
  User.associate =(db)=>{
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, {through: 'Like', as : 'Liked'});
    db.User.belongsToMany(db.User, {through: 'Follow', as:'Followers', foreignKey:'FollowingId'})
    db.User.belongsToMany(db.User, {through: 'Follow', as:'Followings', foreignKey: 'FollowerId'}
    // User와 User가 N:M 관계를 가지기 때문에 중간에 Follow라는 이름의 junction table이 생긴다. 
    // as는 include 연산을 할 때, 쓰는 이름이다. 
    // 그리고 Follow 테이블에는 외래키가 설정이 되는데, 이를 foreignKey 옵션을 통해서 이름을 설정해주는 것이다. 
    // Following     -     Follow     -    Follower
    //         FollowingId      FollowerId   
    )
  }; 
  return User;
}