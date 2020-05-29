"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _AcquisitionController = require('../../app/controllers/AcquisitionController'); var _AcquisitionController2 = _interopRequireDefault(_AcquisitionController);

exports. default = (routes, auth) => {
  // Routes Private
  routes.post('/acquisitions', auth, _AcquisitionController2.default.store);
};
