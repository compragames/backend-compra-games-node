module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      total_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Aguardando Pagamento',
      },
      installments: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'clients', key: 'id' },
        onUpdade: 'CASCADE',
        onDelete: 'SET NULL',
      },
      payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'payments', key: 'id' },
        onUpdade: 'CASCADE',
        onDelete: 'SET NULL',
      },
      card_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'cards', key: 'id' },
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
    return queryInterface.dropTable('sales');
  },
};
