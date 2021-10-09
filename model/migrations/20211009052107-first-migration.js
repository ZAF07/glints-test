'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('restaurants', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: Sequelize.TEXT,
      cash_balance: Sequelize.DECIMAL,
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
     },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    });

    await queryInterface.createTable('menus', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'restaurants',
          key: 'id',
        },
      },
      dish: Sequelize.TEXT,
      price: Sequelize.DECIMAL,
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
  });
  
    await queryInterface.createTable('opening_hours', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      restaurant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'restaurants',
          key: 'id',
        },
      },
      day: Sequelize.TEXT,
      open_hours: Sequelize.TEXT,
      opening_time: Sequelize.TEXT,
      closing_time: Sequelize.TEXT,

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('restaurants');
    await queryInterface.dropTable('menus');
    await queryInterface.dropTable('opening_hours');
  }
};
