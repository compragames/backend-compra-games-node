"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Card extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        card_owner: _sequelize2.default.STRING,
        card_number: _sequelize2.default.INTEGER,
        month: _sequelize2.default.INTEGER,
        year: _sequelize2.default.INTEGER,
        client_id: _sequelize2.default.INTEGER,
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

exports. default = Card;
