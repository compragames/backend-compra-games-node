import * as Yup from 'yup';
import Client from '../models/Client';
import CreateUserServices from '../../services/CreateUserService';
import UpdateUserServices from '../../services/UpdateUserService';
import Addresses from '../models/Address';

import db from '../../database';

class ClientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(3)
        .required()
        .matches(/^(\D\D[A-z]+ \D\D[A-z ]+)$/),
      cpf: Yup.string()
        .length(11)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validations fails' });
    }

    const transaction = await db.getConnection().transaction();
    const { email, password, name, cpf, addresses } = req.body;

    try {
      // throw new Error('Client already exists');
      const user = await CreateUserServices.run({
        email,
        password,
        transaction,
      });

      if (!(await Client.checkCpfCnpj(cpf))) {
        throw new Error('CPF invalid');
      }

      const clientExists = await Client.findOne({ where: { cpf } });
      if (clientExists) {
        throw new Error('Client already exists');
      }
      const clientCreate = await Client.create({ name, cpf });
      await transaction.commit();

      await clientCreate.update({ user_id: user.id });

      if (addresses) {
        try {
          const allAddresses = addresses.map(a => ({
            ...a,
            name: clientCreate.name,
            client_id: clientCreate.id,
            delivery: false,
          }));

          await Addresses.bulkCreate(allAddresses);
        } catch (error) {
          throw new Error('Erro ao criar endereço');
        }
      }

      return res.json({
        client: {
          id: clientCreate.id,
          name,
          cpf,
        },
        user,
      });
    } catch (error) {
      await transaction.rollback();
      return res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      client: Yup.object().shape({
        name: Yup.string()
          .min(3)
          .required()
          .matches(/^(\D\D[A-z]+ \D\D[A-z ]+)$/),
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;
    const { client, user } = req.body;
    try {
      if (user.oldPassword) {
        await UpdateUserServices.run({
          userId: user.id,
          oldPassword: user.oldPassword,
          password: user.password,
        });
      }
      const clientExists = await Client.findByPk(id);

      const { cpf } = await clientExists.update({ name: client.name });
      return res.json({ id, name: client.name, cpf });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    res.json(client);
  }
}

export default new ClientController();
