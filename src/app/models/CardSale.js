import Sequelize, { Model } from 'sequelize';

class CardSale extends Model {
  static init(sequelize) {
    super.init(
      {       
          card_id: Sequelize.INTEGER,
          sale_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Card, { foreignKey: 'id', as: 'cards' });
    this.belongsTo(models.Sale, { foreignKey: 'id', as: 'sales' });
  }
}

export default CardSale;
