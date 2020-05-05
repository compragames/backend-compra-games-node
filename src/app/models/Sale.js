import Sequelize, { Model } from 'sequelize';

class Sale extends Model {
  static init(sequelize) {
    super.init(
      {
        totalPrice: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasOne(models.SaleDetail, { foreignKey: 'saledetail_id', as: 'saledetails' });
    this.hasOne(models.Client, { foreignKey: 'client_id', as: 'clients' });
    this.hasOne(models.Payment, { foreignKey: 'payment_id', as: 'payments' });
    this.belongsTo(models.CardSale, { foreignKey: 'cardsale_id', as: 'cardsales' });
  }
}

export default Sale;
