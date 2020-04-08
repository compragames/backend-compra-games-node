module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('images', 'product_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: { model: 'products', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('images', 'product_id');
  },
};
