import sequelizePackage from 'sequelize';
import allConfig from '../config/config.js';

import initRestaurantModel from './Restaurant.mjs';
import initOpeningHourModel from './OpeningHour.mjs';
import initMenuModel from './Menu.mjs';

const { Sequelize } = sequelizePackage;
const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};
// console.log('CONFIG -> ', config);

let sequelize = new Sequelize(config);

db.Restaurant = initRestaurantModel(sequelize, Sequelize.DataTypes);
db.OpeningHour = initOpeningHourModel(sequelize, Sequelize.DataTypes);
db.Menu = initMenuModel(sequelize, Sequelize.DataTypes);
db.sequelize = sequelize

db.OpeningHour.belongsTo(db.Restaurant);
db.Menu.belongsTo(db.Restaurant);

db.Restaurant.hasMany(db.OpeningHour);
db.Restaurant.hasMany(db.Menu);

export default db;