"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _SessionController = require('../app/controllers/SessionController'); var _SessionController2 = _interopRequireDefault(_SessionController);

// Middlewares
var _auth = require('../app/middleware/auth'); var _auth2 = _interopRequireDefault(_auth);

// Pastas das Rotas
var _Sales = require('./Sales'); var _Sales2 = _interopRequireDefault(_Sales);
var _Users = require('./Users'); var _Users2 = _interopRequireDefault(_Users);
var _Addresses = require('./Addresses'); var _Addresses2 = _interopRequireDefault(_Addresses);
var _Products = require('./Products'); var _Products2 = _interopRequireDefault(_Products);
var _Clients = require('./Clients'); var _Clients2 = _interopRequireDefault(_Clients);
var _Files = require('./Files'); var _Files2 = _interopRequireDefault(_Files);
var _Cards = require('./Cards'); var _Cards2 = _interopRequireDefault(_Cards);
var _Papers = require('./Papers'); var _Papers2 = _interopRequireDefault(_Papers);
var _Payments = require('./Payments'); var _Payments2 = _interopRequireDefault(_Payments);
var _Faqs = require('./Faqs'); var _Faqs2 = _interopRequireDefault(_Faqs);
var _Stocks = require('./Stocks'); var _Stocks2 = _interopRequireDefault(_Stocks);
var _Acquisitions = require('./Acquisitions'); var _Acquisitions2 = _interopRequireDefault(_Acquisitions);
var _PaymentStatus = require('./PaymentStatus'); var _PaymentStatus2 = _interopRequireDefault(_PaymentStatus);

const routes = new (0, _express.Router)();

_Sales2.default.call(void 0, routes, _auth2.default);
_Users2.default.call(void 0, routes, _auth2.default);
_Addresses2.default.call(void 0, routes, _auth2.default);
_Products2.default.call(void 0, routes, _auth2.default);
_Clients2.default.call(void 0, routes, _auth2.default);
_Files2.default.call(void 0, routes, _auth2.default);
_Cards2.default.call(void 0, routes, _auth2.default);
_Papers2.default.call(void 0, routes, _auth2.default);
_Payments2.default.call(void 0, routes, _auth2.default);
_Faqs2.default.call(void 0, routes, _auth2.default);
_Stocks2.default.call(void 0, routes, _auth2.default);
_Acquisitions2.default.call(void 0, routes, _auth2.default);
_PaymentStatus2.default.call(void 0, routes, _auth2.default);
routes.post('/sessions', _SessionController2.default.store);

exports. default = routes;
