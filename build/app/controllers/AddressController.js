"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Address = require('../models/Address'); var _Address2 = _interopRequireDefault(_Address);

class AddressController {
  async store(req, res) {
    const schema = Yup.object().shape({
      street: Yup.string().required(),
      number: Yup.string().required(),
      neighborhood: Yup.string().required(),
      cep: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string()
        .length(2)
        .required(),
      city: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validations fails' });
    }
    if (req.body.add) {
      const address = await _Address2.default.create({ ...req.body, delivery: true });
      return res.json(address);
    }
    const address = [];
    address.push(
      await _Address2.default.create({
        ...req.body,
        delivery: true,
        current_delivery: true,
      })
    );
    address.push(await _Address2.default.create({ ...req.body, delivery: false }));
    return res.json(address);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      street: Yup.string(),
      number: Yup.string(),
      neighborhood: Yup.string(),
      cep: Yup.string(),
      complement: Yup.string(),
      state: Yup.string().length(2),
      city: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;
    const address = await _Address2.default.findByPk(id);
    if (!address) {
      return res.status(400).json({ error: 'address not found' });
    }
    const newAddress = await address.update(req.body);
    return res.json(newAddress);
  }

  async show(req, res) {
    const { id } = req.params;

    const addressess = await _Address2.default.findAll({
      where: { client_id: id, delivery: true },
    });

    return res.json(addressess);
  }
}

exports. default = new AddressController();
