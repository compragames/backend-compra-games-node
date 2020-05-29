"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _Sale = require('../models/Sale'); var _Sale2 = _interopRequireDefault(_Sale);

var _PaymentStatus = require('../models/PaymentStatus'); var _PaymentStatus2 = _interopRequireDefault(_PaymentStatus);
var _Address = require('../models/Address'); var _Address2 = _interopRequireDefault(_Address);
var _Payment = require('../models/Payment'); var _Payment2 = _interopRequireDefault(_Payment);

class SaleController {
  async update(req, res) {
    const { salesId, statusId } = req.params;
    const sale = await _Sale2.default.findByPk(salesId);
    if (!sale) {
      return res.status(400).json({
        error: 'Sale does not exists',
      });
    }

    sale.update({
      status_id: statusId,
    });

    return res.json({ success: true });
  }

  async index(req, res) {
    const { statusId } = req.params;

    const sale = await _Sale2.default.findAll({
      where: {
        status_id: statusId,
      },
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
    if (!sale) {
      return res.status(400).json({
        error: 'Sale does not exists',
      });
    }

    return res.json(sale);
  }
}

exports. default = new SaleController();
