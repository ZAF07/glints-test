/**
 * 
 * @param {Array} raw data from json file 
 * @returns abstracted data specific to filename (restaurant name, and cashBalance only)
 */
const getNameAndCashBalance = (arr) => {
    const restaurants = arr;
    const restaurantNameAndCashBalance = [];
    restaurants.forEach(restaurant => {
      const singleRestaurant = {};
      singleRestaurant.name = restaurant.restaurantName;
      singleRestaurant.cashBalance = restaurant.cashBalance;
      restaurantNameAndCashBalance.push(singleRestaurant);
    })
   return restaurantNameAndCashBalance;
}

exports.getNameAndCashBalance = getNameAndCashBalance;