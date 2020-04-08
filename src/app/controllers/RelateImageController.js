import * as Yup from 'yup';

import Image from '../models/Image';
import Product from '../models/Product';

class RelateImageController {
  async store(req, res) {
    const schema = Yup.object().shape({
      images: Yup.array()
        .of(
          Yup.object().shape({
            id: Yup.number().required(),
          })
        )
        .required(),
      product_id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }
    const { images, product_id } = req.body;
    const productExists = await Product.findByPk(product_id);

    if (!productExists) {
      return res.status(400).json({
        error: 'Product not exists',
      });
    }
    const imgs = [];
    images.map(img => {
      return imgs.push(img.id);
    });

    const files = await Image.findAll(
      {
        where: { id: imgs },
      },
      {
        include: [
          {
            model: Product,
            as: 'product',
            attributes: [],
          },
        ],
      }
    );

    if (!files) {
      return res.status(400).json({
        error: 'Images not exists',
      });
    }
    files.map(async file => {
      await file.update({
        product_id,
      });
    });

    return res.json(imgs);
  }
}

export default new RelateImageController();
