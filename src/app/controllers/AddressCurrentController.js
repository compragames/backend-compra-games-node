import Address from '../models/Address';

class AddressCurrentController {
  async update(req, res) {
    const { client } = req.params;
    const { address_id } = req.body;
    const oldAddressCurrent = await Address.findAll({
      where: { client_id: client, current_delivery: true },
    });

    // se encontrar algum endereço como current ele altera pra false
    if (oldAddressCurrent) {
      oldAddressCurrent.map(async a => {
        await a.update({ current_delivery: false });
      });
    }
    // se encontrar endereço e o atribui como current
    const newAddressCurrent = await Address.findByPk(address_id);

    await newAddressCurrent.update({
      current_delivery: true,
    });
    return res.json(newAddressCurrent);
  }

  async show(req, res) {
    const { client } = req.params;

    const addressCurrent = await Address.findOne({
      where: { client_id: client, current_delivery: true },
    });

    return res.json(addressCurrent);
  }
}

export default new AddressCurrentController();
