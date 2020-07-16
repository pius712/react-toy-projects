
module.exports = (sequelize, DataTypes) =>{
  const Post = sequelize.define('Post', {
    content: {
      type: DataTypes.STRING(200),
      allowNull: false,
    }
  },{
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci'
})
  Post.associate = (db)=> {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag,{through: 'PostHashtag'});
    db.Post.belongsToMany(db.User, {through: 'Like', as : 'Liked' });
    db.Post.belongsTo(db.Post, {as: 'Retweet'}); 
  };
  return Post;
}