"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Sale = require('../models/Sale'); var _Sale2 = _interopRequireDefault(_Sale);
var _Address = require('../models/Address'); var _Address2 = _interopRequireDefault(_Address);
var _Payment = require('../models/Payment'); var _Payment2 = _interopRequireDefault(_Payment);
var _PaymentStatus = require('../models/PaymentStatus'); var _PaymentStatus2 = _interopRequireDefault(_PaymentStatus);

class SaleController {
  async index(req, res) {
    const sale = await _Sale2.default.findAll({
      order: [['created_at', 'DESC']],
      attributes: ['id', 'freight', 'created_at', 'total_price', 'status'],
      include: [
        {
          model: _Address2.default,
          as: 'addresses',
        },
        {
          model: _Payment2.default,
          as: 'payments',
        },
        {
          model: _PaymentStatus2.default,
          as: 'payment_status',
          attributes: ['id', 'status'],
        },
      ],
    });
    return res.json(sale);
  }
}

exports. default = new SaleController();
