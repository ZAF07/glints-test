const getRawData = require('../../utils/general-utils/get-file.js');
const file = './datafile/users_with_purchase_history.json'
const getData = getRawData.getData;

module.exports = {
  up: async (queryInterface) => {
    const userDetails = await getData(file, 'users');
    const purchases = await getData(file, 'purchases');
    // console.log('USERS -> ', userDetails[0]);
    let userSeeded = await queryInterface.bulkInsert(
      'users',
      userDetails,
      { returning: true }
      );
      // console.log('RESTAURANTS RETURNED =-> ', userSeeded);

      const purchaseSeed = [];
      // const purchaseSeed = [];
      
      // USERS
    for (let i = 0; i < userSeeded.length; i += 1) {
      // console.log('REST ID -> ', restaurantFile[i].id);
      // const restId = restaurantFile[i].id;
      // GET RESTAURANT ID
      const userID = userSeeded[i].id

      //  MENUS
      for (let j = 0; j < purchases[i].length; j += 1) {
        const currentUserPurchase = purchases[i];
        currentUserPurchase[j].user_id = userID;
        purchaseSeed.push(currentUserPurchase[j]);
      }
    };

    // console.log('PURCHASES SEEDS -> ', purchaseSeed[0]);

    await queryInterface.bulkInsert('purchases', purchaseSeed);
    // await queryInterface.bulkInsert('menus', purchaseSeed);


  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('purchases', null, {});
    await queryInterface.bulkDelete('users', null, {});
    //  await queryInterface.bulkDelete('restaurants', null, {});
  }
};
