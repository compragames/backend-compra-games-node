"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);

exports. default = async (req, res, next) => {
  const schema = Yup.object().shape({
    total_price: Yup.number().required(),
    status: Yup.string().required(),
    installments: Yup.number().required(),
    client_id: Yup.number().required(),
    payment_id: Yup.number().required(),
    freight: Yup.number().required(),
    address_id: Yup.number().required(),
    products: Yup.array().of(
      Yup.object().shape({
        amount: Yup.number().required(),
        unit_price: Yup.number().required(),
        product_id: Yup.number().required(),
      })
    ),
    card: Yup.object()
      .shape({})
      .when('payment_id', {
        is: 1,
        then: Yup.object().shape({
          name: Yup.string().required(),
          number_card: Yup.string().required(),
          month: Yup.number().required(),
          year: Yup.number().required(),
        }),
      }),
  });

  try {
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: 'Validations fails', message: error.inner });
  }
};
