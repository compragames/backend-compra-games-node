"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Payment = require('../models/Payment'); var _Payment2 = _interopRequireDefault(_Payment);

class PaymentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string()
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validations fails' });
    }

    const { type } = req.body;

    const { id } = await _Payment2.default.create({ type });

    return res.json({
      id,
      type,
    });
  }
}

exports. default = new PaymentController();

