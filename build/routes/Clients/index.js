"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _ClientController = require('../../app/controllers/ClientController'); var _ClientController2 = _interopRequireDefault(_ClientController);

exports. default = (routes, auth) => {
  // Routes Public
  routes.post('/clients', _ClientController2.default.store);

  // Routes Private
  routes.put('/clients/:id', auth, _ClientController2.default.update);
  routes.get('/clients/:id', auth, _ClientController2.default.show);
};
