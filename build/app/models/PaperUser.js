"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class PaperUser extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        user_id: _sequelize2.default.INTEGER,
        paper_id: _sequelize2.default.INTEGER,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Paper, { foreignKey: 'paper_id', as: 'paper' });
  }
}

exports. default = PaperUser;
