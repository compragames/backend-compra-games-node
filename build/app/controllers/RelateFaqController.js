"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Faq = require('../models/Faq'); var _Faq2 = _interopRequireDefault(_Faq);
var _Product = require('../models/Product'); var _Product2 = _interopRequireDefault(_Product);

class RelateImageController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product_id: Yup.number().required(),
      faqs: Yup.array().of(
        Yup.object().shape({
          question: Yup.string().required(),
          answer: Yup.string().required(),
        })
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }
    const { product_id, faqs } = req.body;
    const productExists = await _Product2.default.findByPk(product_id);

    if (!productExists) {
      return res.status(400).json({
        error: 'Product not exists',
      });
    }
    const creation = [];
    faqs.map(async f => {
      const createFaq = await _Faq2.default.create({
        product_id,
        question: f.question,
        answer: f.answer,
      });
      creation.push(createFaq.dataValues);
    });

    return res.json(req.body);
  }

  async delete(req, res) {
    const { id } = req.params;

    const faq = await _Faq2.default.findByPk(id);

    if (!faq) {
      return res.json({ error: 'Faq not does exists' });
    }
    await faq.destroy();

    return res.json(faq);
  }
}

exports. default = new RelateImageController();
