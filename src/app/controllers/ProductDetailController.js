import Product from '../models/Product';
import Image from '../models/Image';
import Faq from '../models/Faq';

class ProductDetailController {
  async show(req, res) {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id },

      include: [
        {
          model: Image,
          as: 'images',
          attributes: ['id', 'name', 'path', 'main', 'url'],
        },
        {
          model: Faq,
          as: 'faqs',
          attributes: ['id', 'question', 'answer'],
        },
      ],
    });
    return res.json(product);
  }
}

export default new ProductDetailController();
