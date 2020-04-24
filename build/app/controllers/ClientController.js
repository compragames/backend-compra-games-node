"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _Client = require('../models/Client'); var _Client2 = _interopRequireDefault(_Client);

class ClientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(3)
        .required()
        .matches(/^(\D\D[A-z]+ \D\D[A-z ]+)$/),
      cpf: Yup.string()
        .length(11)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validations fails' });
    }

    const { name, cpf, user_id } = req.body;

    const clientExists = await _Client2.default.findOne({ where: { cpf } });

    if (!(await _Client2.default.checkCpfCnpj(cpf))) {
      return res.status(400).json({ error: 'CPF invalid' });
    }

    if (clientExists) {
      return res.status(400).json({ error: 'Client already exists' });
    }

    const { id } = await _Client2.default.create({ name, cpf, user_id });

    return res.json({
      id,
      name,
      cpf,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(3)
        .required()
        .matches(/^(\D\D[A-z]+ \D\D[A-z ]+)$/),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;
    const { name } = req.body;
    const client = await _Client2.default.findByPk(id);
    const { cpf } = await client.update({ name });
    return res.json({ id, name, cpf });
  }

  async show(req, res) {
    const { id } = req.params;
    const client = await _Client2.default.findByPk(id);

    res.json(client);
  }
}

exports. default = new ClientController();
