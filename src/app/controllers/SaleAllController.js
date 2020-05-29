import Sale from '../models/Sale';
import Address from '../models/Address';
import Payment from '../models/Payment';
import PaymentStatus from '../models/PaymentStatus';

class SaleController {
  async index(req, res) {
    const sale = await Sale.findAll({
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
    return res.json(sale);
  }
}

export default new SaleController();
