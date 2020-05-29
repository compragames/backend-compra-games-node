"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _PaymentStatus = require('../models/PaymentStatus'); var _PaymentStatus2 = _interopRequireDefault(_PaymentStatus);

class PaymentStatusController {
  async index(req, res) {
    const paymentStatus = await _PaymentStatus2.default.findAll({
      attributes: ['id', 'status'],
    });
    return res.json(paymentStatus);
  }
}

exports. default = new PaymentStatusController();
