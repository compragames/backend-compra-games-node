"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _CardController = require('../../app/controllers/CardController'); var _CardController2 = _interopRequireDefault(_CardController);

exports. default = (routes, auth) => {
  // Routes Private
  routes.post('/cards', auth, _CardController2.default.store);
  routes.get('/cards/:client_id', auth, _CardController2.default.index);
};
