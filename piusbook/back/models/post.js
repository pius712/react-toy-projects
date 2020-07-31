module.exports = (sequelize, DataTypes, Model) => {
  const Post = class extends Model {};
  Post.init(
    {
      content: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      modelName: "Post",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      sequelize,
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    db.Post.belongsTo(db.Post, { as: "Retweet" });
  };
  return Post;
};

// module.exports = (sequelize, DataTypes) => {
//   const Post = sequelize.define(
//     "Post",
//     {
//       content: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//       },
//     },
//     {
//       charset: "utf8mb4",
//       collate: "utf8mb4_general_ci",
//     }
//   );
//   Post.associate = (db) => {
//     db.Post.belongsTo(db.User);
//     db.Post.hasMany(db.Comment);
//     db.Post.hasMany(db.Image);
//     db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
//     db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
//     db.Post.belongsTo(db.Post, { as: "Retweet" });
//   };
//   return Post;
// };
