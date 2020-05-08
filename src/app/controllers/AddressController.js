import * as Yup from 'yup';
import Address from '../models/Address';

class AddressController {
  async store(req, res) {
    const schema = Yup.object().shape({
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
      return res.status(400).json({ error: 'validations fails' });
    }
    if (req.body.add) {
      const address = await Address.create({ ...req.body, delivery: true });
      return res.json(address);
    }
    const address = [];
    address.push(
      await Address.create({
        ...req.body,
        delivery: true,
        current_delivery: true,
      })
    );
    address.push(await Address.create({ ...req.body, delivery: false }));
    return res.json(address);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      street: Yup.string(),
      number: Yup.string(),
      neighborhood: Yup.string(),
      cep: Yup.string(),
      complement: Yup.string(),
      state: Yup.string().length(2),
      city: Yup.string(),
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

  async show(req, res) {
    const { id } = req.params;

    const addressess = await Address.findAll({
      where: { client_id: id, delivery: true },
    });

    return res.json(addressess);
  }
}

export default new AddressController();
