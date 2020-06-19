import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    product_id: Yup.number().required(),
    amount: Yup.number().required(),
    price: Yup.number().required(),
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
