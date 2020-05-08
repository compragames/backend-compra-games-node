import * as Yup from 'yup';
import SaleDetail from '../models/SaleDetail';
import Product from '../models/Product';
import Image from '../models/Image';

class SaleDetailController {
  async store(req, res) {
    const schema = Yup.object().shape({
      products: Yup.array().of(
        Yup.object().shape({
          amount: Yup.number().required(),
          unit_price: Yup.number().required(),
          freight: Yup.number().required(),
        })
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validations fails' });
    }

    const { products } = req.body;

    const sale = await SaleDetail.bulkCreate(products);

    return res.json(sale);
  }

  async index(req, res) {
    const { id } = req.params;
    const sale_detail = await SaleDetail.findAll({
      where: { sale_id: id },
      attributes: [
        'id',
        'amount',
        'unit_price',
        'freight',
        'product_id',
        'sale_id',
        'address_id',
      ],
      include: [
        {
          model: Product,
          as: 'products',
          include: [
            {
              model: Image,
              as: 'images',
              attributes: ['id', 'name', 'path', 'main', 'url'],
            },
          ],
        },
      ],
    });
    return res.json(sale_detail);
  }
}

export default new SaleDetailController();
