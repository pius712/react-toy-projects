module.exports = (sequelize, DataTypes, Model) => {
  const Hashtag = class Hashtag extends Model {};
  Hashtag.init(
    {
      name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      modelName: "Hashtag",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      sequelize,
    }
  );
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  };
  return Hashtag;
};
// module.exports = (sequelize, DataTypes) => {
//   const Hashtag = sequelize.define(
//     "Hashtag",
//     {
//       name: {
//         type: DataTypes.STRING(200),
//         allowNull: false,
//       },
//     },
//     {
//       charset: "utf8mb4",
//       collate: "utf8mb4_general_ci",
//     }
//   );
//   Hashtag.associate = (db) => {
//     db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
//   };
//   return Hashtag;
// };
