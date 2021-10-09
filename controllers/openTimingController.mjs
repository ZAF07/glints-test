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

    // CHECK THAT DETAILS NEEDED WERE GIVEN
  if (!openHour || !closeHour) {
    return res.status(400).json({
      message: 'Please make sure you have given the proper details'
    })
  }

  try {
    
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
    // console.log('TRIMMED DATA -> ', trim[8])
  
    res.status(200).json({
      message: `Restaurants open between ${openHour} and ${closeHour}`,
      data: trim
    });
  } catch (error) {
    res.status(500).json({
      message: 'We are facing some issues. Come back in 5 😬',
      error
    })
  }
};

// NEED NUMoFrESTAURANTS, DISH, PRICE AND KEY
const getRestaurantsAndDishes = async (req, res) => {

  const {restaurants, dish, price, key} = req.query;

  //  AUTHENTICATE USER
  if (!key || key !== 'apiKey') {
    return res.status(401).send('YOU ARE NOT ALLOWED HERE. GET A KEY FIRST')
  };

  // CHECK THAT DETAILS NEEDED WERE GIVEN
  if (!restaurants || !dish || !price) {
    return res.status(400).json({
      message: 'Please make sure you have given the proper details'
    })
  }

  try {
    
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
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong. We will come back as soon as we can! 😲'
    })
  }

}
//  NEEDS TYPE OF SEARCH AND NAME
const getRestaurantsOrDishes = async (req, res) => {
  const {type, name, key} = req.query;
  let data;

  //  AUTHENTICATE USER
  if (!key || key !== 'apiKey') {
    return res.status(401).send('YOU ARE NOT ALLOWED HERE. GET A KEY FIRST 🔑')
  };

  // CHECK THAT DETAILS NEEDED WERE GIVEN
  if (!type || !name) {
    return res.status(400).json({
      message: 'Please make sure you have given the proper details'
    })
  }

  try {
    
    switch (type) {
      case 'restaurant':
         data = await db.Restaurant.findAll({
          attributes: [ 'name', 'id',],
          order: ['name'],
          where: {
            name: {
              [Op.like]: { [Op.any]: [`${name}%`, `%${name}`, `%${name}%`]},
            }
          }
        });
        break;
        case 'dish':
          data = await db.Menu.findAll({
            attributes: [ 'dish', 'id', 'price'],
            where: {
              dish: {
                [Op.like]: { [Op.any]: [`${name}%`, `%${name}`, `%${name}%`]},
              },
            },
  
          }); 
          break;
    
      default:
        res.status(404).send('Please make sure your URI is in correct order🚦')
        break;
    }
    if (!data.length) {
      return res.status(200).send('No results found')
    }
    res.status(200).json({
      message: 'Get restaurant or dishes',
      data
    })
  } catch (error) {
   
    res.status(500).json({
      message: 'We are facing some issue. We will come back fast! Promise 🤞',
      error
    })

  }

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
    
    res.status(500).json({
      msg: 'ERROR FROM UPDATE PURCHASE -> ',
      error

    })
  }

}

export { 
  getRestaurantOpeningTime,
  getRestaurantsAndDishes,
  getRestaurantsOrDishes,
  processPurchase
};