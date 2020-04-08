import * as Yup from 'yup';
import Acquisition from '../models/Acquisition';
import Product from '../models/Product';

class AcquisitionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      product_id: Yup.number().required(),
      amount: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }
    const { product_id, amount, price } = req.body;
    const product = await Product.findOne({
      where: {
        id: product_id,
      },
    });

    if (!product) {
      return res.status(400).json({
        error: 'Product does not exist ',
      });
    }

    const acquisition = await Acquisition.create({
      product_id,
      amount,
      price,
    });
    return res.json(acquisition);
  }
}

export default new AcquisitionController();
