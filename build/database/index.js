"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);

var _User = require('../app/models/User'); var _User2 = _interopRequireDefault(_User);
var _Product = require('../app/models/Product'); var _Product2 = _interopRequireDefault(_Product);
var _Image = require('../app/models/Image'); var _Image2 = _interopRequireDefault(_Image);
var _Faq = require('../app/models/Faq'); var _Faq2 = _interopRequireDefault(_Faq);
var _Acquisition = require('../app/models/Acquisition'); var _Acquisition2 = _interopRequireDefault(_Acquisition);
var _Stock = require('../app/models/Stock'); var _Stock2 = _interopRequireDefault(_Stock);
var _Paper = require('../app/models/Paper'); var _Paper2 = _interopRequireDefault(_Paper);
var _PaperUser = require('../app/models/PaperUser'); var _PaperUser2 = _interopRequireDefault(_PaperUser);
var _Client = require('../app/models/Client'); var _Client2 = _interopRequireDefault(_Client);
var _Address = require('../app/models/Address'); var _Address2 = _interopRequireDefault(_Address);

const models = [
  _User2.default,
  _Product2.default,
  _Image2.default,
  _Faq2.default,
  _Acquisition2.default,
  _Stock2.default,
  _Paper2.default,
  _PaperUser2.default,
  _Client2.default,
  _Address2.default,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new (0, _sequelize2.default)(_database2.default);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

exports. default = new Database();
