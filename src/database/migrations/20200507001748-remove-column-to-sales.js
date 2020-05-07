module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('sales', 'card_id');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('sales', 'card_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'cards', key: 'id' },
      onUpdade: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
};
