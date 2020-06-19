import * as Yup from 'yup';
import User from '../models/User';
import Client from '../models/Client';
import Address from '../models/Address';
import CreateUser from '../../services/CreateUserService';
import UpdateUser from '../../services/UpdateUserService';

class UserController {
  async store(req, res) {
    const { email, password } = req.body;
    const { id, provider } = await CreateUser.run({ email, password });

    return res.json({
      id,
      email,
      provider,
    });
  }

  async update(req, res) {
    const { email, oldPassword, password } = req.body;
    const { id } = req.params;

    await UpdateUser.run({ userId: id, oldPassword, password });

    return res.json({
      id,
      email,
    });
  }

  async show(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ['id', 'email', 'active'],
      include: [
        {
          attributes: ['id', 'name', 'cpf'],
          model: Client,
          as: 'client',
          include: [
            {
              attributes: [
                'id',
                'street',
                'number',
                'neighborhood',
                'cep',
                'complement',
                'state',
                'city',
                'delivery',
              ],
              model: Address,
              as: 'address',
            },
          ],
        },
      ],
    });

    res.json(user);
  }
}

export default new UserController();
