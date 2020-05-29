"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Stock = require('../models/Stock'); var _Stock2 = _interopRequireDefault(_Stock);

class StockController {
  async show(req, res) {
    const { id } = req.params;
    const product = await _Stock2.default.findOne({
      where: { product_id: id },
      attributes: ['id', 'amount', 'product_id'],
    });
    return res.json(product);
  }
}

exports. default = new StockController();
