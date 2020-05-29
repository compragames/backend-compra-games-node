"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _UserController = require('../../app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _cpfValidation = require('../../app/middleware/cpfValidation'); var _cpfValidation2 = _interopRequireDefault(_cpfValidation);
var _userUnavailable = require('../../app/middleware/userUnavailable'); var _userUnavailable2 = _interopRequireDefault(_userUnavailable);
var _auth = require('../../app/middleware/auth'); var _auth2 = _interopRequireDefault(_auth);

exports. default = routes => {
  routes.post(
    '/users',
    _userUnavailable2.default,
    _cpfValidation2.default,
    _UserController2.default.store
  );

  routes.get('/users/:id', _UserController2.default.show);

  // Rotas Privadas
  routes.put('/users', _auth2.default, _UserController2.default.update);
};
