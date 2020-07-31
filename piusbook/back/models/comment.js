module.exports = (sequelize, DataTypes, Model) => {
  const Comment = class Comment extends Model {};
  Comment.init(
    {
      content: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      modelName: "Comment",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      sequelize,
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
};
// module.exports = (sequelize, DataTypes) => {
//   const Comment = sequelize.define(
//     "Comment",
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
//   Comment.associate = (db) => {
//     db.Comment.belongsTo(db.User);
//     db.Comment.belongsTo(db.Post);
//   };
//   return Comment;
// };
