module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('paper_users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'users', key: 'id' },
        onUpdade: 'CASCADE',
        onDelete: 'SET NULL',
      },
      paper_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'papers', key: 'id' },
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
    return queryInterface.dropTable('paper_users');
  },
};
