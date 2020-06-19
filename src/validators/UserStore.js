import * as Yup from 'yup';
import User from '../app/models/User';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    await schema.validate(req.body, { abortEarly: false });

    const userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist) {
      throw new Error('User already exists');
    }

    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message, message: error.inner });
  }
};
