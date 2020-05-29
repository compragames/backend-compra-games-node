"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _SaleController = require('../../app/controllers/SaleController'); var _SaleController2 = _interopRequireDefault(_SaleController);
var _SaleAllController = require('../../app/controllers/SaleAllController'); var _SaleAllController2 = _interopRequireDefault(_SaleAllController);
var _SaleDetailController = require('../../app/controllers/SaleDetailController'); var _SaleDetailController2 = _interopRequireDefault(_SaleDetailController);
var _SaleStatusController = require('../../app/controllers/SaleStatusController'); var _SaleStatusController2 = _interopRequireDefault(_SaleStatusController);
var _SaleStore = require('../../validators/SaleStore'); var _SaleStore2 = _interopRequireDefault(_SaleStore);

exports. default = (routes, auth) => {
  // Routes Public
  routes.get('/saledetails/:id', _SaleDetailController2.default.index);

  // Routes Private
  routes.post('/sales', auth, _SaleStore2.default, _SaleController2.default.store);
  routes.get('/sales/:client_id', auth, _SaleController2.default.index);
  routes.get('/sales/:id/details', auth, _SaleController2.default.show);
  routes.get('/sales', auth, _SaleAllController2.default.index);
  routes.put(
    '/sales/:salesId/status/:statusId',
    auth,
    _SaleStatusController2.default.update
  );

  routes.get('/sales/status/:statusId', auth, _SaleStatusController2.default.index);
};
