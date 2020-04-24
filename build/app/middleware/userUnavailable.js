"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (req, res, next) => {
  const { email } = req.body;
  const userUnavailable = await _User2.default.findOne({ where: { email } });

  if (userUnavailable) {
    return res.status(400).json({ erro: 'User unavailable ' });
  }
  return next();
};
