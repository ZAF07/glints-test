'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
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

    await queryInterface.createTable('purchases', {
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dish: Sequelize.TEXT,
      transaction_amt: Sequelize.DECIMAL,
      transaction_date: Sequelize.DATE,
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
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('purchases');
  }
};
