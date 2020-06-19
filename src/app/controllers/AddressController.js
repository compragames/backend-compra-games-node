import * as Yup from 'yup';
import Address from '../models/Address';

class AddressController {
  async store(req, res) {
    const schema = Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required(),
        street: Yup.string().required(),
        number: Yup.string().required(),
        neighborhood: Yup.string().required(),
        cep: Yup.string().required(),
        complement: Yup.string(),
        state: Yup.string()
          .length(2)
          .required(),
        city: Yup.string().required(),
        delivery: Yup.boolean().required(),
      })
    );

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validations fails' });
    }
    const address = await Address.bulkCreate(req.body);
    return res.json(address);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string().required(),
      neighborhood: Yup.string().required(),
      cep: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string()
        .length(2)
        .required(),
      city: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id } = req.params;
    const address = await Address.findByPk(id);
    if (!address) {
      return res.status(400).json({ error: 'address not found' });
    }
    const newAddress = await address.update(req.body);
    return res.json(newAddress);
  }

  async index(req, res) {
    const { id } = req.params;

    const addressess = await Address.findAll({
      where: { client_id: id, delivery: true, active: true },
      order: ['name'],
    });

    return res.json(addressess);
  }

  async show(req, res) {
    const { id } = req.params;

    const addressess = await Address.findByPk(id);

    return res.json(addressess);
  }

  async delete(req, res) {
    const { id } = req.params;

    const addressess = await Address.findByPk(id);
    await addressess.update({
      active: false,
    });
    return res.json(addressess);
  }
}

export default new AddressController();
