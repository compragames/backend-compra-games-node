"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _FileController = require('../../app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _multer3 = require('../../config/multer'); var _multer4 = _interopRequireDefault(_multer3);

exports. default = (routes, auth) => {
  const upload = _multer2.default.call(void 0, _multer4.default);

  // Routes Private
  routes.post('/files', auth, upload.single('file'), _FileController2.default.store);
  routes.delete('/files/:id', auth, _FileController2.default.delete);
};
