import Sequelize, { Model } from 'sequelize';

class Card extends Model {
  static init(sequelize) {
    super.init(
      {
        card_owner: Sequelize.STRING,
        card_number: Sequelize.INTEGER,
        month: Sequelize.INTEGER,
        year: Sequelize.INTEGER,
        client_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'id', as: 'clients' });
  }
}

export default Card;
