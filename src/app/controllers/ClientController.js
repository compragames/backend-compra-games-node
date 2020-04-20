import * as Yup from 'yup';
import Client from '../models/Client';

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

    const { name, cpf } = req.body;

    const clientExists = await Client.findOne({ where: { cpf } });

    if (!(await Client.checkCpfCnpj(cpf))) {
      return res.status(400).json({ error: 'CPF invalid' });
    }

    if (clientExists) {
      return res.status(400).json({ error: 'Client already exists' });
    }

    const { id } = await Client.create({ name, cpf });

    return res.json({
      id,
      name,
      cpf,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string()
        .min(3)
        .required()
        .matches(/^(\D\D[A-z]+ \D\D[A-z ]+)$/),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;
    const client = await Client.findByPk(id);
    const { name, cpf } = await client.update(req.body);
    return res.json({ id, name, cpf });
  }

  async show(req, res) {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    res.json(client);
  }
}

export default new ClientController();
