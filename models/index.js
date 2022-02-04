const dbConfig = require('../config/dbConfig.js');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORd, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idel,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('DataBase Connected ...');
  })
  .catch((err) => {
    console.log('Error: ' + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./userModel.js')(sequelize, DataTypes);
db.products = require('./productModel.js')(sequelize, DataTypes);
db.categories = require('./categoryModel.js')(sequelize, DataTypes);
db.subcategories = require('./subcategoryModel.js')(sequelize, DataTypes);
db.transations = require('./transactionModel.js')(sequelize, DataTypes);
db.wishlists = require('./wishlistModel.js')(sequelize, DataTypes);
db.comments = require('./commentModel')(sequelize, DataTypes);
db.reviews = require('./reviewModel')(sequelize, DataTypes);



db.sequelize.sync({force: false})
.then(() => {
  console.log("Yes re-sync done!")
})

module.exports = db