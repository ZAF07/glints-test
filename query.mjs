import db from './model/models/index.mjs'
import Sequelize from 'sequelize';

const Op = Sequelize.Op;


const userPurchase = async (dishId, userId, restId) => {
  let restaurantCashBalance;
  let dishPrice;
  let userCashBalance;
  //  get dish amount
    const dishAmount = await db.Menu.findOne({
    attributes: ['price', 'restaurantId'],
    where: {
      id: {
        [Op.eq]: `${dishId}`,
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
        [Op.eq]: `${userId}`,
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
        [Op.eq]: `${restId}`,
      }
    }
  })
  const restaurantDetails = restaurantBalance.dataValues;
  restaurantCashBalance = parseInt(restaurantDetails.cashBalance);
  console.log('RESTAURANT BALANCE -> ', restaurantCashBalance);



  // update restaurant balance
  const restAmtAfterSale = Number(+restaurantCashBalance + +dishPrice);
  const updateRestaurant = await db.Restaurant.update({cashBalance: restAmtAfterSale}, {
    where: {
      id: `${restId}`,
    }
  });
  console.log('UPODATE ===-> ', updateRestaurant);

  // subtract userAmount - dishAmount
  //  update user balance
  const userAmtAfterSale = userCashBalance - dishPrice;
  const updateUserCashBalance = await db.User.update({cashBalance: userAmtAfterSale}, {
    where: {
      id: `${userId}` 
    }
  });
  console.log(updateUserCashBalance);

  // add restaurantAmount + dishAmount
};
userPurchase(60231,2,6610)