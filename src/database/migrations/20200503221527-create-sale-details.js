module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('saledetails', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      unitPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      totalPriceItem: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      fare: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },

      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'products', key: 'id' },
        onUpdade: 'CASCADE',
        onDelete: 'SET NULL',
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'addresses', key: 'id' },
        onUpdade: 'CASCADE',
        onDelete: 'SET NULL',
      },
      payment_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
        references: { model: 'payments', key: 'id' },
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
    return queryInterface.dropTable('saledetails');
  },
};
