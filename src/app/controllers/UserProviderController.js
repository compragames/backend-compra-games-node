import * as Yup from 'yup';
import User from '../models/User';
import PaperUser from '../models/PaperUser';
import Paper from '../models/Paper';

class UserProvidController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required()
        .min(5),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const { name, email, password, provider } = req.body;

    const { id } = await User.create({ name, email, password, provider });
    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async index(req, res) {
    const users = await User.findAll({
      where: { provider: true, active: true },
      attributes: ['id', 'name', 'email', 'provider'],
      include: [
        {
          model: PaperUser,
          as: 'paperUser',
          attributes: ['id', 'paper_id'],
          include: [
            {
              model: Paper,
              as: 'paper',
              attributes: ['id', 'title'],
            },
          ],
        },
      ],
    });

    res.json(users);
  }

  async show(req, res) {
    const { id } = req.params;
    const users = await User.findByPk(id, {
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'provider'],
      include: [
        {
          model: PaperUser,
          as: 'paperUser',
          attributes: ['id', 'paper_id'],
          include: [
            {
              model: Paper,
              as: 'paper',
              attributes: ['id', 'title'],
            },
          ],
        },
      ],
    });

    res.json(users);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
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

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.params.id);

    if (email && email !== user.email) {
      const userExist = await User.findOne({ where: { email } });

      if (userExist) {
        return res.status(400).json({ error: 'User already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: 'User does not exists' });
    }
    const { name, email } = await user.update({
      active: false,
    });
    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserProvidController();
