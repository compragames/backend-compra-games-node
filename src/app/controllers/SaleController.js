import Sale from '../models/Sale';
import SaleDetail from '../models/SaleDetail';
import Address from '../models/Address';
import Payment from '../models/Payment';
import Product from '../models/Product';
import Image from '../models/Image';
import SalesHistoryCard from '../models/SalesHistoryCard';
import PaymentStatus from '../models/PaymentStatus';
import Stock from '../models/Stock';

import bd from '../../database';

class SaleController {
  async store(req, res) {
    const transaction = await bd.getConnection().transaction();

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
        const stock = await Stock.findOne({
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
      const sales = await Sale.create(
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
      await SaleDetail.bulkCreate(productsDetail, { transaction });

      // Adiciona na tabela de venda x cartao
      if (sales.card) {
        await SalesHistoryCard.create(
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

    const sale = await Sale.findAll({
      where: { client_id },
      order: ['created_at'],
      attributes: ['id', 'freight', 'created_at', 'total_price', 'status'],
      include: [
        {
          model: Address,
          as: 'addresses',
        },
        {
          model: Payment,
          as: 'payments',
        },
        {
          model: PaymentStatus,
          as: 'payment_status',
          attributes: ['id', 'status'],
        },
      ],
    });
    return res.json(sale);
  }

  async show(req, res) {
    const { id } = req.params;
    const sale = await Sale.findByPk(id, {
      attributes: ['id', 'freight', 'created_at', 'total_price', 'status'],
      include: [
        {
          model: SaleDetail,
          as: 'saledetails',
          include: [
            {
              model: Product,
              as: 'products',
              include: [
                {
                  model: Image,
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

export default new SaleController();
