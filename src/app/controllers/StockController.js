import * as Yup from 'yup';
import Stock from '../models/Stock';

class StockController {
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
