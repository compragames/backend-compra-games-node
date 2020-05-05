import Sequelize, { Model } from 'sequelize';

class Card extends Model {
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
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'clients' });  
     
  }
}

export default Card;
