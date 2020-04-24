"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Address extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        street: _sequelize2.default.STRING,
        number: _sequelize2.default.STRING,
        neighborhood: _sequelize2.default.STRING,
        cep: _sequelize2.default.STRING,
        complement: _sequelize2.default.STRING,
        state: _sequelize2.default.STRING,
        city: _sequelize2.default.STRING,
        delivery: _sequelize2.default.BOOLEAN,
        active: _sequelize2.default.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Client, { foreignKey: 'client_id', as: 'client' });
  }
}
exports. default = Address;
