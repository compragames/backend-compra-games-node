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

    res.json({
      id,
      name,
      cpf,
    });

  }
}

export default new ClientController();
