"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Sale extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        freight: _sequelize2.default.DECIMAL,
        total_price: _sequelize2.default.DECIMAL,
        installments: _sequelize2.default.INTEGER,
        status: _sequelize2.default.STRING,
        client_id: _sequelize2.default.INTEGER,
        payment_id: _sequelize2.default.INTEGER,
        card_id: _sequelize2.default.INTEGER,
        address_id: _sequelize2.default.INTEGER,
        products: _sequelize2.default.VIRTUAL,
        card: _sequelize2.default.VIRTUAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Client, { foreignKey: 'id', as: 'clients' });
    this.belongsTo(models.Payment, {
      foreignKey: 'payment_id',
      as: 'payments',
    });
    this.hasMany(models.SaleDetail, {
      foreignKey: 'sale_id',
      as: 'saledetails',
    });
    this.hasOne(models.Card, { foreignKey: 'id', as: 'cards' });
    this.belongsTo(models.Address, {
      foreignKey: 'address_id',
      as: 'addresses',
    });
    this.belongsTo(models.PaymentStatus, {
      foreignKey: 'status_id',
      as: 'payment_status',
    });
  }
}

exports. default = Sale;
