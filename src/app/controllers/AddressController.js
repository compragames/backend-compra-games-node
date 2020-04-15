import * as Yup from 'yup';
import Address from '../models/Address';

class AddressController {
  async store(req, res) {
    const schema = Yup.object().shape({
      street: Yup.string().required(),
      number: Yup.string().required(),
      neighborhood: Yup.string().required(),
      cep: Yup.string().required(),
      complement: Yup.string().required(),
      state: Yup.string()
        .length(2)
        .required(),
      city: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      res.json({ error: 'validations fails' });
    }
    const address = await Address.create(req.body);
    res.json(address);
  }
}

export default new AddressController();
