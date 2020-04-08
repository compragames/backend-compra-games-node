import Sequelize, { Model } from 'sequelize';

class Paper extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }
}

export default Paper;
