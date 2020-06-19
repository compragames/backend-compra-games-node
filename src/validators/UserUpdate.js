import * as Yup from 'yup';
import User from '../app/models/User';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    await schema.validate(req.body, { abortEarly: false });

    // const userExist = await User.findOne({ where: { email: req.body.email } });
    // if (userExist) {
    //   throw new Error('User already exists');
    // }

    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message, message: error.inner });
  }
};
