"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _PaperUser = require('../models/PaperUser'); var _PaperUser2 = _interopRequireDefault(_PaperUser);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Paper = require('../models/Paper'); var _Paper2 = _interopRequireDefault(_Paper);

class PaperUserController {
  async store(req, res) {
    const { paper_id, user_id } = req.body;

    const user = await _User2.default.findByPk(user_id);
    const paper = await _Paper2.default.findByPk(paper_id);

    if (!user) {
      return res.status(400).json({ error: 'user not exists' });
    }

    if (!paper) {
      return res.status(400).json({ error: 'paper not exists' });
    }
    const paperUser = await _PaperUser2.default.create({
      paper_id,
      user_id,
    });
    return res.json(paperUser);
  }

  async update(req, res) {
    const { id, paper_id, user_id } = req.body;

    const user = await _User2.default.findByPk(user_id);
    const paper = await _Paper2.default.findByPk(paper_id);
    const paperUser = await _PaperUser2.default.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: 'user not exists' });
    }

    if (!paper) {
      return res.status(400).json({ error: 'paper not exists' });
    }

    if (!paperUser) {
      return res.status(400).json({ error: 'paperUser not exists' });
    }

    await paperUser.update({
      paper_id,
      user_id,
    });
    return res.json(paperUser);
  }
}

exports. default = new PaperUserController();
