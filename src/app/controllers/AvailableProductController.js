import Product from '../models/Product';

class StockController {
  async store(req, res) {
    const { id } = req.params;

    const productExists = await Product.findByPk(id);
    if (!productExists) {
      return res.status(400).json({
        error: 'Product not exists',
      });
    }

    const product = await productExists.update({
      available: true,
    });
    return res.json(product);
  }

  async delete(req, res) {
    const { id } = req.params;

    const productExists = await Product.findByPk(id);
    if (!productExists) {
      return res.status(400).json({
        error: 'Product not exists',
      });
    }

    const product = await productExists.update({
      available: false,
    });
    return res.json(product);
  }
}

export default new StockController();
