import SaleDetail from '../models/SaleDetail';
import Product from '../models/Product';
import Image from '../models/Image';

class SaleDetailController {
  async index(req, res) {
    const { id } = req.params;
    const sale_detail = await SaleDetail.findAll({
      where: { sale_id: id },
      attributes: ['id', 'amount', 'unit_price', 'product_id', 'sale_id'],
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
