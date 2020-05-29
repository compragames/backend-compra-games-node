"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _SaleDetail = require('../models/SaleDetail'); var _SaleDetail2 = _interopRequireDefault(_SaleDetail);
var _Product = require('../models/Product'); var _Product2 = _interopRequireDefault(_Product);
var _Image = require('../models/Image'); var _Image2 = _interopRequireDefault(_Image);

class SaleDetailController {
  async index(req, res) {
    const { id } = req.params;
    const sale_detail = await _SaleDetail2.default.findAll({
      where: { sale_id: id },
      attributes: ['id', 'amount', 'unit_price', 'product_id', 'sale_id'],
      include: [
        {
          model: _Product2.default,
          as: 'products',
          include: [
            {
              model: _Image2.default,
              as: 'images',
              attributes: ['id', 'name', 'path', 'main', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(sale_detail);
  }
}

exports. default = new SaleDetailController();
