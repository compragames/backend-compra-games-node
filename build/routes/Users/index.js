"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _UserController = require('../../app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _UserProviderController = require('../../app/controllers/UserProviderController'); var _UserProviderController2 = _interopRequireDefault(_UserProviderController);

var _cpfValidation = require('../../app/middleware/cpfValidation'); var _cpfValidation2 = _interopRequireDefault(_cpfValidation);
var _userUnavailable = require('../../app/middleware/userUnavailable'); var _userUnavailable2 = _interopRequireDefault(_userUnavailable);

exports. default = (routes, auth) => {
  // Routes Public

  routes.post(
    '/users',
    _userUnavailable2.default,
    _cpfValidation2.default,
    _UserController2.default.store
  );

  // Routes Private

  routes.get('/users/:id', auth, _UserController2.default.show);
  routes.put('/users', auth, _UserController2.default.update);
  routes.get('/user/provider', auth, _UserProviderController2.default.index);
  routes.get('/user/provider/:id', auth, _UserProviderController2.default.show);
  routes.post('/users/provider', auth, _UserProviderController2.default.store);
  routes.put('/user/provider/:id', auth, _UserProviderController2.default.update);
  routes.delete('/user/provider/:id', auth, _UserProviderController2.default.delete);
};
