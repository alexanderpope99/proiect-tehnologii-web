const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.expenses = require('./expense.model.js')(sequelize, Sequelize);
db.categories = require('./category.model.js')(sequelize, Sequelize);

db.categories.hasMany(db.expenses, {
  as: 'expenses',
});
db.expenses.belongsTo(db.categories, {
  as: 'category',
  foreignKey: 'categoryId',
  targetKey: 'id',
});

module.exports = db;
