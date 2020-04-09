"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Paper = require('../models/Paper'); var _Paper2 = _interopRequireDefault(_Paper);

class PaperController {
  async store(req, res) {
    const { title } = req.body;
    const paper = await _Paper2.default.create({
      title,
    });
    res.json(paper);
  }

  async update(req, res) {
    const { id } = req.params;
    const { title } = req.body;

    const paper = await _Paper2.default.findByPk(id);

    if (!paper) {
      res.json({ error: 'Paper does not match' });
    }
    paper.update({
      title,
    });
    res.json(paper);
  }

  async index(req, res) {
    const paper = await _Paper2.default.findAll();

    res.json(paper);
  }
}

exports. default = new PaperController();
