import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Product from '../app/models/Product';
import Image from '../app/models/Image';
import Faq from '../app/models/Faq';
import Acquisition from '../app/models/Acquisition';
import Stock from '../app/models/Stock';
import Paper from '../app/models/Paper';
import PaperUser from '../app/models/PaperUser';

const models = [
  User,
  Product,
  Image,
  Faq,
  Acquisition,
  Stock,
  Paper,
  PaperUser,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
