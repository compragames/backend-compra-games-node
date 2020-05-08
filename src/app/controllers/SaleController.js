import * as Yup from 'yup';
import Sale from '../models/Sale';
import SaleDetail from '../models/SaleDetail';
import Address from '../models/Address';
import Payment from '../models/Payment';

class SaleController {
  async store(req, res) {
    const schema = Yup.object().shape({
      total_price: Yup.number().required(),
      status: Yup.string().required(),
      installments: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validations fails' });
    }

    try {
      const {
        total_price,
        status,
        installments,
        client_id,
        payment_id,
        card_id,
      } = req.body;

      const { id } = await Sale.create({
        total_price,
        status,
        installments,
        client_id,
        payment_id,
        card_id,
      });

      return res.json({
        id,
        total_price,
        status,
        client_id,
        payment_id,
        card_id,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message, msg: 'Ola' });
    }
  }

  async index(req, res) {
    const { id } = req.params;
    const sale = await Sale.findAll({
      where: { client_id: id },
      attributes: ['id', 'created_at', 'total_price', 'status'],
      include: [
        {
          model: SaleDetail,
          as: 'saledetails',
          include: [{ model: Address, as: 'addresses' }],
        },
        {
          model: Payment,
          as: 'payments',
        },
      ],
    });
    return res.json(sale);
  }
}

export default new SaleController();
