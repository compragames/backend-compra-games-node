"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _UserController = require('./app/controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _SessionController = require('./app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);
var _FileController = require('./app/controllers/FileController'); var _FileController2 = _interopRequireDefault(_FileController);
var _ProductController = require('./app/controllers/ProductController'); var _ProductController2 = _interopRequireDefault(_ProductController);
var _ProductDetailController = require('./app/controllers/ProductDetailController'); var _ProductDetailController2 = _interopRequireDefault(_ProductDetailController);
var _RelateImageController = require('./app/controllers/RelateImageController'); var _RelateImageController2 = _interopRequireDefault(_RelateImageController);
var _RelateFaqController = require('./app/controllers/RelateFaqController'); var _RelateFaqController2 = _interopRequireDefault(_RelateFaqController);
var _AcquisitionController = require('./app/controllers/AcquisitionController'); var _AcquisitionController2 = _interopRequireDefault(_AcquisitionController);
var _AvailableProductController = require('./app/controllers/AvailableProductController'); var _AvailableProductController2 = _interopRequireDefault(_AvailableProductController);
var _PaperControlller = require('./app/controllers/PaperControlller'); var _PaperControlller2 = _interopRequireDefault(_PaperControlller);
var _UserProviderController = require('./app/controllers/UserProviderController'); var _UserProviderController2 = _interopRequireDefault(_UserProviderController);
var _PaperUserController = require('./app/controllers/PaperUserController'); var _PaperUserController2 = _interopRequireDefault(_PaperUserController);

var _auth = require('./app/middleware/auth'); var _auth2 = _interopRequireDefault(_auth);

var _updateStock = require('./app/middleware/updateStock'); var _updateStock2 = _interopRequireDefault(_updateStock);
var _multer3 = require('./config/multer'); var _multer4 = _interopRequireDefault(_multer3);

const routes = new (0, _express.Router)();
const upload = _multer2.default.call(void 0, _multer4.default);

routes.post('/sessions', _SessionController2.default.store);
routes.post('/users', _UserController2.default.store);
routes.get('/products', _ProductController2.default.index);
routes.get('/products/:id', _ProductController2.default.show);

routes.use(_auth2.default);

routes.put('/users', _UserController2.default.update);

routes.post('/files', upload.single('file'), _FileController2.default.store);
routes.delete('/files/:id', _FileController2.default.delete);

routes.post('/products', _ProductController2.default.store);

routes.put('/products/:id', _ProductController2.default.update);

routes.get(`/products/:id/detail`, _ProductDetailController2.default.show);

// A rota de compra tem um middleware para atualizar o estoque
routes.post(
  '/acquisitions',
  _updateStock2.default,
  _AcquisitionController2.default.store
);

routes.put('/availableProduct/:id', _AvailableProductController2.default.store);
routes.delete('/availableProduct/:id', _AvailableProductController2.default.delete);

routes.post('/relateProductImage', _RelateImageController2.default.store);
routes.post('/relateFaqProduct', _RelateFaqController2.default.store);

routes.delete('/faq/:id', _RelateFaqController2.default.delete);

routes.post('/paper', _PaperControlller2.default.store);
routes.get('/paper', _PaperControlller2.default.index);
routes.put('/paper/:id', _PaperControlller2.default.update);

routes.post('/paperUser', _PaperUserController2.default.store);
routes.put('/paperUser', _PaperUserController2.default.update);

routes.get('/user/provider', _UserProviderController2.default.index);
routes.get('/user/provider/:id', _UserProviderController2.default.show);
routes.post('/users/provider', _UserProviderController2.default.store);
routes.put('/user/provider/:id', _UserProviderController2.default.update);
routes.delete('/user/provider/:id', _UserProviderController2.default.delete);

exports. default = routes;
