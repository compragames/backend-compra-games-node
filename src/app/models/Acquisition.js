import Sequelize, { Model } from 'sequelize';

class Acquisition extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.INTEGER,
        price: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'acquisition',
    });
  }
}

export default Acquisition;
