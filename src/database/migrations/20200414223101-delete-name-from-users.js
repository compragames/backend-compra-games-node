module.exports = {
  up: queryInterface => {
    return queryInterface.removeColumn('users', 'name');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'name', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
