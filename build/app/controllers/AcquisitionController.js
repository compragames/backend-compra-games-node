"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Acquisition = require('../models/Acquisition'); var _Acquisition2 = _interopRequireDefault(_Acquisition);
var _Product = require('../models/Product'); var _Product2 = _interopRequireDefault(_Product);

class AcquisitionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product_id: Yup.number().required(),
      amount: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }
    const { product_id, amount, price } = req.body;
    const product = await _Product2.default.findOne({
      where: {
        id: product_id,
      },
    });

    if (!product) {
      return res.status(400).json({
        error: 'Product does not exist ',
      });
    }

    const acquisition = await _Acquisition2.default.create({
      product_id,
      amount,
      price,
    });
    return res.json(acquisition);
  }
}

exports. default = new AcquisitionController();
