const {Sequelize, DataTypes} = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize,DataTypes);
db.Post = require('./post')(sequelize,DataTypes);
db.Comment = require('./comment')(sequelize,DataTypes);
db.Hashtag = require('./Hashtag')(sequelize,DataTypes);
db.Image = require('./Image')(sequelize,DataTypes);
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
