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
import Client from '../app/models/Client';
import Address from '../app/models/Address';
import Card from '../app/models/Card';
import Sale from '../app/models/Sale';
import Payment from '../app/models/Payment';
import SaleDetail from '../app/models/SaleDetail';
import SalesHistoryCard from '../app/models/SalesHistoryCard';
import PaymentStatus from '../app/models/PaymentStatus';

const models = [
  User,
  Product,
  Image,
  Faq,
  Acquisition,
  Stock,
  Paper,
  PaperUser,
  Client,
  Address,
  Card,
  Sale,
  Payment,
  SaleDetail,
  SalesHistoryCard,
  PaymentStatus,
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

  getConnection() {
    return this.connection;
  }
}

export default new Database();
