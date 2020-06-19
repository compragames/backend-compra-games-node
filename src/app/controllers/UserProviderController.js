import * as Yup from 'yup';
import User from '../models/User';
import PaperUser from '../models/PaperUser';
import Paper from '../models/Paper';

class UserProvidController {
  async store(req, res) {
    const schema = Yup.object().shape({
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
    const { email, password, provider, paper } = req.body;

    const { id } = await User.create({ email, password, provider });
    await PaperUser.create({
      user_id: id,
      paper_id: paper,
    });
    return res.json({
      id,

      email,
      provider,
    });
  }

  async index(req, res) {
    const users = await User.findAll({
      where: { provider: true, active: true },
      attributes: ['id', 'email', 'provider'],
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
      attributes: ['id', 'email', 'provider'],
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
    const { id, paperId } = req.body;

    if (paperId) {
      const result = await PaperUser.findOne({ where: { user_id: id } });
      await result.update({
        paper_id: paperId,
      });
    }

    return res.json({
      sucess: 'ok',
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
