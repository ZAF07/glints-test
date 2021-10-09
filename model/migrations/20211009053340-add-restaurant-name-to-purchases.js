module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('purchases', 'restaurant_name',
        {
          type: Sequelize.TEXT,
        });

  },

  down: async (queryInterface) => {
      await queryInterface.removeColumn('users', 'restaurant_name');
  }
};