const { Sequelize, DataTypes, Model } = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[env];

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.User = require("./user")(sequelize, DataTypes, Model);
db.Post = require("./post")(sequelize, DataTypes, Model);
db.Comment = require("./comment")(sequelize, DataTypes, Model);
db.Hashtag = require("./hashtag")(sequelize, DataTypes, Model);
db.Image = require("./image")(sequelize, DataTypes, Model);
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
