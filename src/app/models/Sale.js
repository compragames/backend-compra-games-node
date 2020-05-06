import Sequelize, { Model } from 'sequelize';

class Sale extends Model {
  static init(sequelize) {
    super.init(
      {
        total_price: Sequelize.DECIMAL,
        status: Sequelize.STRING,
        installments: Sequelize.INTEGER,
        client_id: Sequelize.INTEGER,
        payment_id: Sequelize.INTEGER,
        card_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasOne(models.Client, { foreignKey: 'client_id', as: 'clients' });
    this.hasOne(models.Payment, { foreignKey: 'payment_id', as: 'payments' });
    this.hasMany(models.SaleDetail, { foreignKey: 'sale_id', as: 'saledetails' });
    this.hasOne(models.Card, { foreignKey: 'card_id', as: 'cards' });    
  }
}

export default Sale;
