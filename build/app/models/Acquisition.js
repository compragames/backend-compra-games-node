"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _Stock = require('./Stock'); var _Stock2 = _interopRequireDefault(_Stock);

class Acquisition extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        amount: _sequelize2.default.INTEGER,
        price: _sequelize2.default.DECIMAL,
      },
      {
        sequelize,
      }
    );
    this.addHook('afterCreate', async acquisition => {
      const stockExists = await _Stock2.default.findOne({
        where: { product_id: acquisition.product_id },
      });
      if (stockExists) {
        await stockExists.update({
          amount: Number(stockExists.amount) + Number(acquisition.amount),
        });
        return;
      }
      await _Stock2.default.create({
        product_id: acquisition.product_id,
        amount: acquisition.amount,
      });
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'acquisition',
    });
  }
}

exports. default = Acquisition;
