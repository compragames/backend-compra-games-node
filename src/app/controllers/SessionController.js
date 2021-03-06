import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import auth from '../../config/auth';
import PaperUser from '../models/PaperUser';
import Paper from '../models/Paper';
import Client from '../models/Client';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      include: [
        {
          attributes: ['id', 'name', 'cpf'],
          model: Client,
          as: 'client',
        },
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

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!user.active) {
      return res.status(401).json({ error: 'User not active' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, provider, active, paperUser, client } = user;

    return res.json({
      user: {
        id,
        email,
        provider,
        active,
        client,
        paperUser: {
          id: paperUser ? paperUser.id : null,
          paper: paperUser ? paperUser.paper_id : null,
          title: paperUser ? paperUser.paper.title : null,
        },
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionController();
