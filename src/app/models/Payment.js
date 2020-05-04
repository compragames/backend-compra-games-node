import Sequelize, { Model } from 'sequelize';

class Payment extends Model {
  static init(sequelize) {
    super.init(
      {
        cardOwner: Sequelize.STRING,
        cardNumber: Sequelize.INTEGER,
        dueDate: Sequelize.DATE,            
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
