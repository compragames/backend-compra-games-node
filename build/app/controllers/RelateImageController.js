"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

var _Image = require('../models/Image'); var _Image2 = _interopRequireDefault(_Image);
var _Product = require('../models/Product'); var _Product2 = _interopRequireDefault(_Product);

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
    const productExists = await _Product2.default.findByPk(product_id);

    if (!productExists) {
      return res.status(400).json({
        error: 'Product not exists',
      });
    }
    const imgs = [];
    images.map(img => {
      return imgs.push(img.id);
    });

    const files = await _Image2.default.findAll(
      {
        where: { id: imgs },
      },
      {
        include: [
          {
            model: _Product2.default,
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

exports. default = new RelateImageController();
