import db from './model/models/index.mjs'
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

// const openAtCertainTime = async (openHour, closeHour) => {
//   const data = await db.OpeningHour.findAll({
//     include: {
//       model: db.Restaurant,
//     },
//     attributes: [ 'openingTime', 'closingTime', 'day', 'openHours'],
//     where: {
//       openingTime: {
//         [Op.between]: [`${openHour}`, `${closeHour}`],
//       }
//     }
//   });

//   const a = data;
//   // console.log(a[0].restaurant);
//   const opening = (a.dataValues);
//   const trim = [];
//   a.forEach(open => {
//     const details = {};
//     const currentRestaurant = open.restaurant.dataValues;
//     details.openHours = open.openHours;
//     details.openingTime = open.openingTime;
//     details.closingTime = open.closingTime;
//     details.day = open.day;
//     details.restaurantName = currentRestaurant.name;
//     details.restaurantID = currentRestaurant.id;
//     trim.push(details);
//     // trim.push(open.dataValues);

//   });
//   console.log('TRIMMED DATA -> ', trim[8]);
// };

// openAtCertainTime('11:00', '23:00')