import Sequelize, { Model } from 'sequelize';

class Payment extends Model {
  static init(sequelize) {
    super.init(
      {
        type: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.SaleDetail, { foreignKey: 'saleDetail_id', as: 'saledetails' });
  }
}
export default Payment;
