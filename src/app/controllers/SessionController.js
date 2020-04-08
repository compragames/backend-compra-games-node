import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import auth from '../../config/auth';
import PaperUser from '../models/PaperUser';
import Paper from '../models/Paper';

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

    const { id, name, provider, active, paperUser } = user;
    return res.json({
      user: {
        id,
        name,
        email,
        provider,
        active,
        paperUser: {
          id: paperUser.id,
          paper: paperUser.paper_id,
          title: paperUser.paper.title,
        },
      },
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionController();
