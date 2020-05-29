"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Sale = require('../models/Sale'); var _Sale2 = _interopRequireDefault(_Sale);
var _SaleDetail = require('../models/SaleDetail'); var _SaleDetail2 = _interopRequireDefault(_SaleDetail);
var _Address = require('../models/Address'); var _Address2 = _interopRequireDefault(_Address);
var _Payment = require('../models/Payment'); var _Payment2 = _interopRequireDefault(_Payment);
var _Product = require('../models/Product'); var _Product2 = _interopRequireDefault(_Product);
var _Image = require('../models/Image'); var _Image2 = _interopRequireDefault(_Image);
var _SalesHistoryCard = require('../models/SalesHistoryCard'); var _SalesHistoryCard2 = _interopRequireDefault(_SalesHistoryCard);
var _PaymentStatus = require('../models/PaymentStatus'); var _PaymentStatus2 = _interopRequireDefault(_PaymentStatus);
var _Stock = require('../models/Stock'); var _Stock2 = _interopRequireDefault(_Stock);

var _database = require('../../database'); var _database2 = _interopRequireDefault(_database);

class SaleController {
  async store(req, res) {
    const transaction = await _database2.default.getConnection().transaction();

    try {
      const {
        freight,
        total_price,
        installments,
        status,
        card_id,
        products,
        client_id,
        payment_id,
        address_id,
        card,
      } = req.body;

      // Verifica Estoque
      products.map(async p => {
        const stock = await _Stock2.default.findOne({
          where: { product_id: p.product_id },
        });
        if (p.amount > stock.amount) {
          throw new Error('Produto fora de estoque');
        }
        await stock.update(
          {
            amount: stock.amount - p.amount,
          },
          { transaction }
        );
      });

      // Criar venda
      const sales = await _Sale2.default.create(
        {
          total_price,
          status,
          installments,
          client_id,
          payment_id,
          card_id,
          products,
          freight,
          address_id,
          card,
        },
        { transaction }
      );

      const productsDetail = sales.products.map(s => ({
        ...s,
        sale_id: sales.id,
      }));
      await _SaleDetail2.default.bulkCreate(productsDetail, { transaction });

      // Adiciona na tabela de venda x cartao
      if (sales.card) {
        await _SalesHistoryCard2.default.create(
          {
            ...sales.card,
            sales_id: sales.id,
          },
          { transaction }
        );
      }
      await transaction.commit();
      return res.json({
        id: sales.id,
        total_price,
        status,
        client_id,
        payment_id,
        card_id,
      });
    } catch (error) {
      await transaction.rollback();
      return res.status(400).json({ message: error.message });
    }
  }

  async index(req, res) {
    const { client_id } = req.params;

    const sale = await _Sale2.default.findAll({
      where: { client_id },
      attributes: ['id', 'freight', 'created_at', 'total_price', 'status'],
      include: [
        {
          model: _Address2.default,
          as: 'addresses',
        },
        {
          model: _Payment2.default,
          as: 'payments',
        },
        {
          model: _PaymentStatus2.default,
          as: 'payment_status',
          attributes: ['id', 'status'],
        },
      ],
    });
    return res.json(sale);
  }

  async show(req, res) {
    const { id } = req.params;
    const sale = await _Sale2.default.findByPk(id, {
      attributes: ['id', 'freight', 'created_at', 'total_price', 'status'],
      include: [
        {
          model: _SaleDetail2.default,
          as: 'saledetails',
          include: [
            {
              model: _Product2.default,
              as: 'products',
              include: [
                {
                  model: _Image2.default,
                  as: 'images',
                  attributes: ['id', 'name', 'path', 'main', 'url'],
                },
              ],
            },
          ],
        },
      ],
    });
    return res.json(sale);
  }
}

exports. default = new SaleController();
