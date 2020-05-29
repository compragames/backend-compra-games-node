"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Client = require('../models/Client'); var _Client2 = _interopRequireDefault(_Client);

exports. default = async (req, res, next) => {
  try {
    const { cpf } = req.body;

    const cpfIsValid = await _Client2.default.checkCpfCnpj(cpf);
    if (!cpfIsValid) {
      throw new Error("CPF doesn't valid");
    }

    const client = await _Client2.default.findOne({ where: { cpf } });
    if (client) {
      throw new Error('Client already exists');
    }
    return next();
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};
