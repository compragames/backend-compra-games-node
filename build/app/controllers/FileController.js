"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _path = require('path');
var _Image = require('../models/Image'); var _Image2 = _interopRequireDefault(_Image);

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const file = await _Image2.default.create({
      name,
      path,
    });
    return res.json(file);
  }

  async delete(req, res) {
    const { id } = req.params;

    const file = await _Image2.default.findByPk(id);

    _fs2.default.unlink(_path.resolve.call(void 0, 'tmp', 'uploads', file.path), err => {
      if (err) throw err;
    });

    await file.destroy({
      where: { id },
    });
    return res.json(file);
  }
}

exports. default = new FileController();
