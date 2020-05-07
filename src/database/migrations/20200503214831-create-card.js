module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      card_owner: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      card_number: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
      },
      month: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'clients', key: 'id' },
        onUpdade: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('cards');
  },
};
