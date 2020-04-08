import * as Yup from 'yup';
import Product from '../models/Product';
import Image from '../models/Image';
import Stock from '../models/Stock';
import Faq from '../models/Faq';

class ProductController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      labels: Yup.string().required(),
      plataform: Yup.string().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }
    const product = await Product.create(req.body);

    return res.json(product);
  }

  async index(req, res) {
    const { page = 1 } = req.query;
    const product = await Product.findAll({
      where: { available: true },
      order: ['title'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Image,
          as: 'images',
          attributes: ['id', 'name', 'path', 'main', 'url'],
        },
        {
          model: Stock,
          as: 'stock',
          attributes: ['amount'],
        },
      ],
    });
    return res.json(product);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      labels: Yup.string().required(),
      plataform: Yup.string().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }
    const { id } = req.params;
    const product = await Product.findOne({
      where: {
        id,
      },
    });
    await product.update(req.body);
    return res.json(product);
  }

  async show(req, res) {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id },

      include: [
        {
          model: Image,
          as: 'images',
          attributes: ['id', 'path', 'url', 'name'],
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

export default new ProductController();
