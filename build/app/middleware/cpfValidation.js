"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Client = require('../models/Client'); var _Client2 = _interopRequireDefault(_Client);

exports. default = async (req, res, next) => {
  const { cpf } = req.body;
  const cpfIsValid = await _Client2.default.checkCpfCnpj(cpf);

  if (!cpfIsValid) {
    return res.status(400).json({ erro: "CPF doesn't valid" });
  }
  const client = await _Client2.default.findOne({ where: { cpf } });

  if (client) {
    return res.status(400).json({ erro: 'Client already exists' });
  }
  return next();
};
