"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _PaymentStatusController = require('../../app/controllers/PaymentStatusController'); var _PaymentStatusController2 = _interopRequireDefault(_PaymentStatusController);

exports. default = (routes, auth) => {
  // Routes Private
  routes.get('/payment/status', auth, _PaymentStatusController2.default.index);
};
