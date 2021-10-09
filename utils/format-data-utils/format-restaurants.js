//  ABSTRACT NAME AND CASHBALANCE
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
// export default getNameAndCashBalance;
exports.getNameAndCashBalance = getNameAndCashBalance;