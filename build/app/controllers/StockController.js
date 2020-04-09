"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Stock = require('../models/Stock'); var _Stock2 = _interopRequireDefault(_Stock);
var _Product = require('../models/Product'); var _Product2 = _interopRequireDefault(_Product);

class StockController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product_id: Yup.number().required(),
      amount: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }
    const { product_id, amount } = req.body;

    const productExists = await _Product2.default.findByPk(product_id);
    if (!productExists) {
      return res.status(400).json({
        error: 'Product not exists',
      });
    }

    const stockExists = await _Stock2.default.findOne({ where: { product_id } });

    if (stockExists) {
      const stock = await stockExists.update({
        amount: parseInt(stockExists.amount, 10) + parseInt(amount, 10),
      });
      return res.json(stock);
    }
    const stock = await _Stock2.default.create({
      product_id,
      amount,
    });
    return res.json(stock);
  }
}

exports. default = new StockController();
