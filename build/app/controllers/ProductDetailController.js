"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Product = require('../models/Product'); var _Product2 = _interopRequireDefault(_Product);
var _Image = require('../models/Image'); var _Image2 = _interopRequireDefault(_Image);
var _Faq = require('../models/Faq'); var _Faq2 = _interopRequireDefault(_Faq);

class ProductDetailController {
  async show(req, res) {
    const { id } = req.params;

    const product = await _Product2.default.findOne({
      where: { id },

      include: [
        {
          model: _Image2.default,
          as: 'images',
          attributes: ['id', 'name', 'path', 'main', 'url'],
        },
        {
          model: _Faq2.default,
          as: 'faqs',
          attributes: ['id', 'question', 'answer'],
        },
      ],
    });
    return res.json(product);
  }
}

exports. default = new ProductDetailController();
