"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _StockController = require('../controllers/StockController'); var _StockController2 = _interopRequireDefault(_StockController);

exports. default = function(req, res, next) {
  next();

  _StockController2.default.store(req, res);
}
