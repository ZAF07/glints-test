const getRawData = require('../../utils/general-utils/get-file.js');
const file = './datafile/restaurant_with_menu.json'
const getData = getRawData.getData;

module.exports = {
  up: async (queryInterface) => {
    const restaurantFile = await getData(file, 'restaurant');
    const menuFile = await getData(file, 'menu');
    const timeFile = await getData(file, 'time');
    
    let restaurantsSeeded = await queryInterface.bulkInsert(
      'restaurants',
      restaurantFile,
      { returning: true }
      );

      const timeSeed = [];
      const menuSeed = [];
      
      // RESTAURANTS
    for (let i = 0; i < restaurantsSeeded.length; i += 1) {
      // GET RESTAURANT ID
      const restaurant_id = restaurantsSeeded[i].id

      //  MENUS
      for (let j = 0; j < menuFile[i].length; j += 1) {
        const currentRestDish = menuFile[i];
        currentRestDish[j].restaurant_id = restaurant_id;
        menuSeed.push(currentRestDish[j]);
      }
      // TIME
      for (let k = 0; k < timeFile[i].length; k += 1) {
        const openingHoursCurrentRest = timeFile[i][k];
        openingHoursCurrentRest.restaurant_id = restaurant_id;
        timeSeed.push(openingHoursCurrentRest);
      }
    };

    await queryInterface.bulkInsert('opening_hours', timeSeed);
    await queryInterface.bulkInsert('menus', menuSeed);

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('opening_hours', null, {});
    await queryInterface.bulkDelete('menus', null, {});
     await queryInterface.bulkDelete('restaurants', null, {});
  }
};
