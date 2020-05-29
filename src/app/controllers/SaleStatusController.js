import { Op } from 'sequelize';
import Sale from '../models/Sale';

import PaymentStatus from '../models/PaymentStatus';
import Address from '../models/Address';
import Payment from '../models/Payment';

class SaleController {
  async update(req, res) {
    const { salesId, statusId } = req.params;
    const sale = await Sale.findByPk(salesId);
    if (!sale) {
      return res.status(400).json({
        error: 'Sale does not exists',
      });
    }

    sale.update({
      status_id: statusId,
    });

    return res.json({ success: true });
  }

  async index(req, res) {
    const { statusId } = req.params;

    const sale = await Sale.findAll({
      where: {
        status_id: statusId,
      },
      order: [['created_at', 'DESC']],
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
    if (!sale) {
      return res.status(400).json({
        error: 'Sale does not exists',
      });
    }

    return res.json(sale);
  }
}

export default new SaleController();
