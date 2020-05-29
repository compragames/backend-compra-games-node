"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _ProductController = require('../../app/controllers/ProductController'); var _ProductController2 = _interopRequireDefault(_ProductController);
var _ProductDetailController = require('../../app/controllers/ProductDetailController'); var _ProductDetailController2 = _interopRequireDefault(_ProductDetailController);
var _RelateImageController = require('../../app/controllers/RelateImageController'); var _RelateImageController2 = _interopRequireDefault(_RelateImageController);
var _AvailableProductController = require('../../app/controllers/AvailableProductController'); var _AvailableProductController2 = _interopRequireDefault(_AvailableProductController);

exports. default = (routes, auth) => {
  // Routes Public

  routes.get('/products', _ProductController2.default.index);
  routes.get('/products/:id', _ProductController2.default.show);

  // Routes Private
  routes.get(`/products/:id/detail`, auth, _ProductDetailController2.default.show);
  routes.post('/products', auth, _ProductController2.default.store);
  routes.put('/products/:id', auth, _ProductController2.default.update);
  routes.post('/relateProductImage', auth, _RelateImageController2.default.store);
  routes.put('/availableProduct/:id', auth, _AvailableProductController2.default.store);
  routes.delete(
    '/availableProduct/:id',
    auth,
    _AvailableProductController2.default.delete
  );
};
