"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _PaymentController = require('../../app/controllers/PaymentController'); var _PaymentController2 = _interopRequireDefault(_PaymentController);

exports. default = routes => {
  // Routes Public
  routes.post('/payments', _PaymentController2.default.store);
};
