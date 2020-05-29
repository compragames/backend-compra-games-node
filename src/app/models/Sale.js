import Sequelize, { Model } from 'sequelize';

class Sale extends Model {
  static init(sequelize) {
    super.init(
      {
        freight: Sequelize.DECIMAL,
        total_price: Sequelize.DECIMAL,
        installments: Sequelize.INTEGER,
        status: Sequelize.STRING,
        client_id: Sequelize.INTEGER,
        payment_id: Sequelize.INTEGER,
        card_id: Sequelize.INTEGER,
        address_id: Sequelize.INTEGER,
        products: Sequelize.VIRTUAL,
        card: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Client, { foreignKey: 'id', as: 'clients' });
    this.belongsTo(models.Payment, {
      foreignKey: 'payment_id',
      as: 'payments',
    });
    this.hasMany(models.SaleDetail, {
      foreignKey: 'sale_id',
      as: 'saledetails',
    });
    this.hasOne(models.Card, { foreignKey: 'id', as: 'cards' });
    this.belongsTo(models.Address, {
      foreignKey: 'address_id',
      as: 'addresses',
    });
    this.belongsTo(models.PaymentStatus, {
      foreignKey: 'status_id',
      as: 'payment_status',
    });
  }
}

export default Sale;
