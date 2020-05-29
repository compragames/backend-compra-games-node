"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class SalesHistoryCard extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        sales_id: _sequelize2.default.INTEGER,
        name: _sequelize2.default.STRING,
        number_card: _sequelize2.default.STRING,
        month: _sequelize2.default.INTEGER,
        year: _sequelize2.default.INTEGER,
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

exports. default = SalesHistoryCard;
