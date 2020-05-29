"use strict";module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('sales', 'status_id', {
      type: Sequelize.INTEGER,
      defaultValue: 2,
      allowNull: false,
      references: { model: 'payment_status', key: 'id' },
      onUpdade: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('sales', 'status_id');
  },
};
