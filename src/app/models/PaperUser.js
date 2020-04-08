import Sequelize, { Model } from 'sequelize';

class PaperUser extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: Sequelize.INTEGER,
        paper_id: Sequelize.INTEGER,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Paper, { foreignKey: 'paper_id', as: 'paper' });
  }
}

export default PaperUser;
