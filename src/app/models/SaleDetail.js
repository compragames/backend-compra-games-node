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
    this.hasOne(models.Address, { foreignKey: 'id', as: 'addresses' });
    this.hasMany(models.Product, { foreignKey: 'id', as: 'products' });
  }
}

export default SaleDetail;
