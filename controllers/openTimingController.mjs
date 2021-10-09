import db from '../model/models/index.mjs'
import Sequelize from 'sequelize';

const Op = Sequelize.Op
// NEEDS openHour, closeHour and key
const getRestaurantOpeningTime = async (req, res) => {
  // const {key: userKey} = req.params;
  const {openHour, closeHour, key} = req.query;
  // console.log('USER KEY -> ', userKey);

  //  AUTHENTICATE USER
  if (!key || key !== 'apiKey') {
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

// NEED NUMoFrESTAURANTS, DISH, PRICE AND KEY
const getRestaurantsAndDishes = async (req, res) => {

  const {restaurants, dish, price, key} = req.query;

  //  AUTHENTICATE USER
  if (!key || key !== 'apiKey') {
    return res.status(401).send('YOU ARE NOT ALLOWED HERE. GET A KEY FIRST')
  };

   const data = await db.Menu.findAll({
    include: {
      model: db.Restaurant,
    },
    attributes: [ 'dish', 'price', 'restaurant.name'],
    where: {
      dish: {
        [Op.like]: `${dish}%`,
      }
    }
  }); 
  const lists = [];
  data.forEach(result => {
    const details = {};
    const restaurantDetails = result.restaurant.dataValues
    details.dishName = result.dish;
    details.price = result.price;
    details.restaurantName = restaurantDetails.name;
    details.restaurantID = restaurantDetails.id;
    lists.push(details)
  })

  res.status(200).json({
    message: `top ${restaurants} restaurants that have dishes like '${dish}' priced within $${price}`,
    data: lists
  })
}
//  NEEDS TYPE OF SEARCH AND NAME
const getRestaurantsOrDishes = async (req, res) => {
  const {type, name} = req.query;
  let data;
  switch (type) {
    case 'restaurant':
       data = await db.Restaurant.findAll({
        attributes: [ 'name', 'id',],
        where: {
          name: {
            [Op.like]: `${name}%`,
          }
        }
      });
      break;
      case 'dish':
        data = await db.Menu.findAll({
          attributes: [ 'dish', 'id', 'price'],
          where: {
            dish: {
              [Op.like]: `${name}%`,
            }
          }
        }); 
        break;
  
    default:
      res.status(404).send('Please make sure your URI is in correct order🚦')
      break;
  }
  res.send(data)
}

// NEEDS DISHID, USERID, RESTAURANTID
const processPurchase = async (req, res) => {
  const {dishId, restId, userId} = req.body;
  console.log(dishId, restId, userId);
  
  const dishID = parseInt(dishId);
  const restID = parseInt(restId);
  const userID = parseInt(userId);

  let restaurantCashBalance;
  let dishPrice;
  let userCashBalance;

  try {
    
    //  get dish amount
      const dishAmount = await db.Menu.findOne({
      attributes: ['price', 'restaurantId'],
      where: {
        id: {
          [Op.eq]: `${dishID}`,
        }
      }
    });
    const dishDetails = dishAmount.dataValues;
    dishPrice = parseInt(dishDetails.price);
  
    console.log('DISH PRICE-> ', dishPrice);
  
    // get user amount
      const userBalance = await db.User.findAll({
      attributes: [ 'name', 'cashBalance', 'id'],
      where: {
        id: {
          [Op.eq]: `${userID}`,
        }
      }
    });
    const userDetails = userBalance[0].dataValues;
    userCashBalance = parseInt(userDetails.cashBalance);
    console.log('UserBalance -> ', userCashBalance);
  
    //  get restaurant balance
    const restaurantBalance = await db.Restaurant.findOne({
      attributes: ['cashBalance', 'id', ],
      where: {
        id: {
          [Op.eq]: `${restID}`,
        }
      }
    })
    const restaurantDetails = restaurantBalance.dataValues;
    restaurantCashBalance = parseInt(restaurantDetails.cashBalance);
    console.log('RESTAURANT BALANCE -> ', restaurantCashBalance);
  
  
  
    // update restaurant balance
    // add restaurantAmount + dishAmount
    const restAmtAfterSale = Number(+restaurantCashBalance + +dishPrice);
    const updateRestaurant = await db.Restaurant.update({cashBalance: restAmtAfterSale}, {
      where: {
        id: `${restId}`,
      }
    });
    console.log('UPODATE ===-> ', updateRestaurant);
  
    //  update user balance
    // subtract userAmount - dishAmount
    const userAmtAfterSale = userCashBalance - dishPrice;
    const updateUserCashBalance = await db.User.update({cashBalance: userAmtAfterSale}, {
      where: {
        id: `${userId}` 
      }
    });
    console.log('USER CASH BALANCE -> ', updateUserCashBalance);
    res.status(200).send('Success!');
  } catch (error) {
    if (error) {
      console.error('ERROR FROM UPDATE PURCHASE -> ', error);
    }
  }

}

export { 
  getRestaurantOpeningTime,
  getRestaurantsAndDishes,
  getRestaurantsOrDishes,
  processPurchase
};