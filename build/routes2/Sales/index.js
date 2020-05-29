"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _auth = require('../../app/middleware/auth'); var _auth2 = _interopRequireDefault(_auth);
var _SaleController = require('../../app/controllers/SaleController'); var _SaleController2 = _interopRequireDefault(_SaleController);
var _SaleStore = require('../../validators/SaleStore'); var _SaleStore2 = _interopRequireDefault(_SaleStore);

exports. default = routes => {
  routes.use(_auth2.default);
  routes.post('/sales', _SaleStore2.default, _SaleController2.default.store);
  routes.get('/sales/:client_id', _SaleController2.default.index);
  routes.get('/sales/:id/details', _SaleController2.default.show);
};
