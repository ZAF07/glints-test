import db from './model/models/index.mjs'
import Sequelize from 'sequelize';

const Op = Sequelize.Op;


const userPurchase = async (dishId, userId, restId) => {
  //  get the dish amount
    const dishAmount = await db.Menu.findOne({
    attributes: [ 'dish', 'price',],
    where: {
      id: {
        [Op.eq]: `${dishId}`,
      }
    }
  });
  // console.log('DISH -> ', dishAmount);
  // get user amount
    const userBalance = await db.User.findAll({
    attributes: [ 'name', 'cashBalance', 'id'],
    where: {
      id: {
        [Op.eq]: `${userId}`,
      }
    }
  });
  console.log('UserBalance -> ', dishAmount);
  //  get restaurant amount

  // subtract userAmount - dishAmount

  // add restaurantAmount + dishAmount
};
userPurchase(1001)