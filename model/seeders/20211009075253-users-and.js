const getRawData = require('../../utils/general-utils/get-file.js');
const file = './datafile/users_with_purchase_history.json'
const getData = getRawData.getData;

module.exports = {
  up: async (queryInterface) => {
    const userDetails = await getData(file, 'users');
    const purchases = await getData(file, 'purchases');

    let userSeeded = await queryInterface.bulkInsert(
      'users',
      userDetails,
      { returning: true }
      );

      const purchaseSeed = [];
      
      // USERS
    for (let i = 0; i < userSeeded.length; i += 1) {
      // GET RESTAURANT ID
      const userID = userSeeded[i].id

      //  MENUS
      for (let j = 0; j < purchases[i].length; j += 1) {
        const currentUserPurchase = purchases[i];
        currentUserPurchase[j].user_id = userID;
        purchaseSeed.push(currentUserPurchase[j]);
      }
    };

    await queryInterface.bulkInsert('purchases', purchaseSeed);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('purchases', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
