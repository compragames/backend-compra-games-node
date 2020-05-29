"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _RelateFaqController = require('../../app/controllers/RelateFaqController'); var _RelateFaqController2 = _interopRequireDefault(_RelateFaqController);

exports. default = (routes, auth) => {
  // Routes Private
  routes.post('/relateFaqProduct', auth, _RelateFaqController2.default.store);
  routes.delete('/faq/:id', auth, _RelateFaqController2.default.delete);
};
