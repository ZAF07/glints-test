/**
 * 
 * @param {Array} dataToConvert parsed and formatted data from json file 
 * @returns {Array} seed formatted data (restaurant table)
 */
const convertRestaurantSeed = (dataToConvert) => {

  const restaurantsSeed = [];
  for (let i = 0; i < dataToConvert.length; i += 1) {
    const data = {}
    data.name = dataToConvert[i].name;
    data.cash_balance = dataToConvert[i].cashBalance;
    data.created_at = new Date();
    data.updated_at = new Date();
    restaurantsSeed.push(data);
  }

  return restaurantsSeed
}

exports.convertRestaurantSeed = convertRestaurantSeed