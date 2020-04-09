"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Product extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        title: _sequelize2.default.STRING,
        description: _sequelize2.default.STRING,
        labels: _sequelize2.default.STRING,
        plataform: _sequelize2.default.STRING,
        available: _sequelize2.default.BOOLEAN,
        price: _sequelize2.default.DECIMAL,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Image, { foreignKey: 'product_id', as: 'images' });
    this.hasMany(models.Faq, { foreignKey: 'product_id', as: 'faqs' });
    this.hasOne(models.Stock, { foreignKey: 'product_id', as: 'stock' });
  }
}

exports. default = Product;
