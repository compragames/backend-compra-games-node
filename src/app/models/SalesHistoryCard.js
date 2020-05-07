import Sequelize, { Model } from 'sequelize';

class SalesHistoryCard extends Model {
  static init(sequelize) {
    super.init(
      {
        sales_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
        number_card: Sequelize.INTEGER,
        month: Sequelize.INTEGER,
        year: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasOne(models.Sale, { foreignKey: 'id', as: 'sales' });
  }
}

export default SalesHistoryCard;
