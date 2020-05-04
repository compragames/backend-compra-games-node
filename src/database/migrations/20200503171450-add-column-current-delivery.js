module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('addresses', 'current_delivery', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('addresses', 'current_delivery');
  },
};
