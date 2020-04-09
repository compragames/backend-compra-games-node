"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Product = require('../models/Product'); var _Product2 = _interopRequireDefault(_Product);

class StockController {
  async store(req, res) {
    const { id } = req.params;

    const productExists = await _Product2.default.findByPk(id);
    if (!productExists) {
      return res.status(400).json({
        error: 'Product not exists',
      });
    }

    const product = await productExists.update({
      available: true,
    });
    return res.json(product);
  }

  async delete(req, res) {
    const { id } = req.params;

    const productExists = await _Product2.default.findByPk(id);
    if (!productExists) {
      return res.status(400).json({
        error: 'Product not exists',
      });
    }

    const product = await productExists.update({
      available: false,
    });
    return res.json(product);
  }
}

exports. default = new StockController();
