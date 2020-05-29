"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _AddressController = require('../../app/controllers/AddressController'); var _AddressController2 = _interopRequireDefault(_AddressController);
var _AddressCurrentController = require('../../app/controllers/AddressCurrentController'); var _AddressCurrentController2 = _interopRequireDefault(_AddressCurrentController);

exports. default = (routes, auth) => {
  // Routes Public
  routes.post('/addresses', _AddressController2.default.store);

  // Routes Private
  routes.put('/addresses/:id', auth, _AddressController2.default.update);
  routes.get('/addresses/client/:id', auth, _AddressController2.default.show);

  routes.put(
    '/addressesCurrent/client/:client',
    auth,
    _AddressCurrentController2.default.update
  );
  routes.get(
    '/addressesCurrent/client/:client',
    auth,
    _AddressCurrentController2.default.show
  );
};
