module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sale_details', {
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
      unit_price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      freight: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onUpdade: 'CASCADE',
        onDelete: 'SET NULL',
      },
      sale_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sales', key: 'id' },
        onUpdade: 'CASCADE',
        onDelete: 'SET NULL',
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'addresses', key: 'id' },
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
    return queryInterface.dropTable('sale_details');
  },
};
