import Sequelize, { Model } from 'sequelize';

class SaleDetail extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.INTEGER,
        unit_price: Sequelize.DECIMAL,
        freight: Sequelize.DECIMAL,
        product_id: Sequelize.INTEGER,
        sale_id: Sequelize.INTEGER,
        address_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Address, {
      foreignKey: 'address_id',
      as: 'addresses',
    });
    this.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'products',
    });
  }
}

export default SaleDetail;
