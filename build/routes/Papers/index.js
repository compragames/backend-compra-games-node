"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _PaperControlller = require('../../app/controllers/PaperControlller'); var _PaperControlller2 = _interopRequireDefault(_PaperControlller);
var _PaperUserController = require('../../app/controllers/PaperUserController'); var _PaperUserController2 = _interopRequireDefault(_PaperUserController);

exports. default = (routes, auth) => {
  // Routes Private
  routes.post('/paper', auth, _PaperControlller2.default.store);
  routes.get('/paper', auth, _PaperControlller2.default.index);
  routes.put('/paper/:id', auth, _PaperControlller2.default.update);
  routes.post('/paperUser', auth, _PaperUserController2.default.store);
  routes.put('/paperUser', auth, _PaperUserController2.default.update);
};
