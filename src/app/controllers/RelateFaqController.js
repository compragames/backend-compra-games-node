import * as Yup from 'yup';
import Faq from '../models/Faq';
import Product from '../models/Product';

class RelateImageController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product_id: Yup.number().required(),
      faqs: Yup.array().of(
        Yup.object().shape({
          question: Yup.string().required(),
          answer: Yup.string().required(),
        })
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }
    const { product_id, faqs } = req.body;
    const productExists = await Product.findByPk(product_id);

    if (!productExists) {
      return res.status(400).json({
        error: 'Product not exists',
      });
    }
    const creation = [];
    faqs.map(async f => {
      const createFaq = await Faq.create({
        product_id,
        question: f.question,
        answer: f.answer,
      });
      creation.push(createFaq.dataValues);
    });

    return res.json(req.body);
  }

  async delete(req, res) {
    const { id } = req.params;

    const faq = await Faq.findByPk(id);

    if (!faq) {
      return res.json({ error: 'Faq not does exists' });
    }
    await faq.destroy();

    return res.json(faq);
  }
}

export default new RelateImageController();
