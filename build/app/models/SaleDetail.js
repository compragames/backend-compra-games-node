"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class SaleDetail extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        amount: _sequelize2.default.INTEGER,
        unit_price: _sequelize2.default.DECIMAL,
        product_id: _sequelize2.default.INTEGER,
        sale_id: _sequelize2.default.INTEGER,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'products',
    });
  }
}

exports. default = SaleDetail;
