import sequelizePackage from 'sequelize';
import allConfig from '../config/config.js';
import url from 'url';

import initRestaurantModel from './Restaurant.mjs';
import initOpeningHourModel from './OpeningHour.mjs';
import initMenuModel from './Menu.mjs';
import initUserModel from './User.mjs';

const { Sequelize } = sequelizePackage;
const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};
// console.log('CONFIG -> ', config);

let sequelize;

if (env === 'production') {
  // Break apart the Heroku database url and rebuild the configs we need
  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(
    dbUrl.auth.indexOf(':') + 1,
    dbUrl.auth.length
  );
  const dbName = dbUrl.path.slice(1);
  const host = dbUrl.hostname;
  const { port } = dbUrl;
  config.host = host;
  config.port = port;
  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
}

// let sequelize = new Sequelize(config);

db.Restaurant = initRestaurantModel(sequelize, Sequelize.DataTypes);
db.OpeningHour = initOpeningHourModel(sequelize, Sequelize.DataTypes);
db.Menu = initMenuModel(sequelize, Sequelize.DataTypes);
db.sequelize = sequelize

// USERS
db.User = initUserModel(sequelize, Sequelize.DataTypes);

db.OpeningHour.belongsTo(db.Restaurant);
db.Menu.belongsTo(db.Restaurant);

db.Restaurant.hasMany(db.OpeningHour);
db.Restaurant.hasMany(db.Menu);

export default db;