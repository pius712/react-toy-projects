module.exports = (sequelize, DataTypes, Model) => {
  const Image = class Image extends Model {};
  Image.init(
    {
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      modelName: "Image",
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
      sequelize,
    }
  );
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
};
