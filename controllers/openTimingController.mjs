import db from '../model/models/index.mjs'
import Sequelize from 'sequelize';

const Op = Sequelize.Op

const getRestaurantOpeningTime = async (req, res) => {
  const {key: userKey} = req.params;
  const {openHour, closeHour} = req.query;
  console.log('USER KEY -> ', userKey);

  //  AUTHENTICATE USER
  if (!userKey || userKey !== 'apiKey') {
    return res.status(401).send('YOU ARE NOT ALLOWED HERE. GET A KEY FIRST')
  };

  // QUERY DB
  const data = await db.OpeningHour.findAll({
    include: {
      model: db.Restaurant,
    },
    attributes: [ 'openingTime', 'closingTime', 'day', 'openHours'],
    where: {
      openingTime: {
        [Op.between]: [`${openHour}`, `${closeHour}`],
      }
    }
  });

  const a = data;
  // console.log(a[0].restaurant);
  const opening = (a.dataValues);
  const trim = [];
  a.forEach(open => {
    const details = {};
    const currentRestaurant = open.restaurant.dataValues;
    details.openHours = open.openHours;
    details.openingTime = open.openingTime;
    details.closingTime = open.closingTime;
    details.day = open.day;
    details.restaurantName = currentRestaurant.name;
    details.restaurantID = currentRestaurant.id;
    trim.push(details);
    // trim.push(open.dataValues);

  });
  console.log('TRIMMED DATA -> ', trim[8])

  res.status(200).json({
    message: `Restaurants open between ${openHour} and ${closeHour}`,
    data: trim
  });
};

export default getRestaurantOpeningTime;