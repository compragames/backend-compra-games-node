"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _cpfcnpjvalidator = require('cpf-cnpj-validator');

class Client extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
        cpf: _sequelize2.default.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static checkCpfCnpj(cpf) {
    return _cpfcnpjvalidator.cpf.isValid(cpf);
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: 'client_id', as: 'address' });
  }
}
exports. default = Client;
