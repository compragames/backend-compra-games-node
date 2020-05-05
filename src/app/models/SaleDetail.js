import Sequelize, { Model } from 'sequelize';

class SaleDetail extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.INTEGER,
        unitPrice: Sequelize.DECIMAL,
        fare: Sequelize.DECIMAL,             
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasOne(models.Address, { foreignKey: 'address_id', as: 'addresses' });
    this.hasMany(models.Product, { foreignKey: 'product_id', as: 'products' });
    this.hasOne(models.Payment, { foreignKey: 'payment_id', as: 'payments' });
  }
}

export default SaleDetail;
