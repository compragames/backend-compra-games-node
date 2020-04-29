import * as Yup from 'yup';
import Stock from '../models/Stock';
import Product from '../models/Product';

class StockController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product_id: Yup.number().required(),
      amount: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }
    const { product_id, amount } = req.body;

    const productExists = await Product.findByPk(product_id);
    if (!productExists) {
      return res.status(400).json({
        error: 'Product not exists',
      });
    }

    const stockExists = await Stock.findOne({ where: { product_id } });

    if (stockExists) {
      const stock = await stockExists.update({
        amount: parseInt(stockExists.amount, 10) + parseInt(amount, 10),
      });
      return res.json(stock);
    }
    const stock = await Stock.create({
      product_id,
      amount,
    });
    return res.json(stock);
  }

  async show(req, res) {
    const { id } = req.params;
    const product = await Stock.findOne({
      where: { product_id: id },
      attributes: ['id', 'amount', 'product_id'],
    });
    return res.json(product);
  }
}

export default new StockController();
