"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Product = require('../models/Product'); var _Product2 = _interopRequireDefault(_Product);
var _Image = require('../models/Image'); var _Image2 = _interopRequireDefault(_Image);
var _Stock = require('../models/Stock'); var _Stock2 = _interopRequireDefault(_Stock);
var _Faq = require('../models/Faq'); var _Faq2 = _interopRequireDefault(_Faq);

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      labels: Yup.string().required(),
      plataform: Yup.string().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }
    const product = await _Product2.default.create(req.body);

    return res.json(product);
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const product = await _Product2.default.findAll({
      where: { available: true },
      order: ['title'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: _Image2.default,
          as: 'images',
          attributes: ['id', 'name', 'path', 'main', 'url'],
        },
        {
          model: _Stock2.default,
          as: 'stock',
          attributes: ['amount'],
        },
      ],
    });
    return res.json(product);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      labels: Yup.string().required(),
      plataform: Yup.string().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }
    const { id } = req.params;
    const product = await _Product2.default.findOne({
      where: {
        id,
      },
    });
    await product.update(req.body);
    return res.json(product);
  }

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

exports. default = new ProductController();
