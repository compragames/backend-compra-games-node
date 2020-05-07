import * as Yup from 'yup';
import SaleDetail from '../models/SaleDetail';
import Sale from '../models/Sale';

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
    const sale_detail = await SaleDetail.findAll({
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
        //             {
        //                 model:SaleDetail,
        //                 as: 'saledetails',
        //                 attributes: ['id', 'amount', 'unit_price', 'freight', 'product_id',
        //                  'sale_id', 'address_id'
        //             ],
        // },
        {
          model: Sale,
          as: 'sales',
          attributes: ['id', 'total_price', 'status', 'payment_id'],
        },
      ],
    });
    return res.json(sale_detail);
  }
}

export default new SaleDetailController();
