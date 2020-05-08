import * as Yup from 'yup';
import Stock from '../models/Stock';

class StockSaleController {
  async update(req, res) {
    const schema = Yup.object().shape({
      products: Yup.array().of(
        Yup.object().shape({
          product_id: Yup.number().required(),
          amount: Yup.number().required(),
        })
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }
    try {
      const { products } = req.body;

      products.map(async p => {
        const stock = await Stock.findOne({
          where: { product_id: p.product_id },
        });
        await stock.update({
          amount: stock.amount - p.amount,
        });
      });

      return res.json({ message: 'Success' });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export default new StockSaleController();
