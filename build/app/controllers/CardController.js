"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Card = require('../models/Card'); var _Card2 = _interopRequireDefault(_Card);

class CardController {
  async store(req, res) {
    const schema = Yup.object().shape({
      card_owner: Yup.string()
        .min(3)
        .required()
        .matches(/^(\D\D[A-z]+ \D\D[A-z ]+)$/),
      card_number: Yup.string()
        .min(5)
        .required(),
      client_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { card_owner, card_number, year, month, client_id } = req.body;

    const cardExists = await _Card2.default.findOne({ where: { card_number } });

    if (cardExists) {
      return res.status(400).json({ error: 'Card already exists!' });
    }

    const { id } = await _Card2.default.create({
      card_owner,
      card_number,
      year,
      month,
      client_id,
    });

    return res.json({ id, card_owner, card_number, year, month, client_id });
  }

  async index(req, res) {
    const { client_id } = req.params;
    const card = await _Card2.default.findAll({ where: { client_id } });
    return res.json(card);
  }
}

exports. default = new CardController();
