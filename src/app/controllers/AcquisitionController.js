import Acquisition from '../models/Acquisition';
import Product from '../models/Product';
import CreateStock from '../../services/CreateStockService';

class AcquisitionController {
  async store(req, res) {
    try {
      const { product_id, amount, price } = req.body;
      const product = await Product.findOne({
        where: {
          id: product_id,
        },
      });
      // Verifica se existe produto
      if (!product) {
        throw new Error('Product does not exist');
      }

      // Cria uma compra
      const acquisition = await Acquisition.create({
        product_id,
        amount,
        price,
      });

      // adiciona no stock a compra
      await CreateStock.run({ product_id, amount });

      return res.json(acquisition);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}

export default new AcquisitionController();
