"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Address = require('../models/Address'); var _Address2 = _interopRequireDefault(_Address);

class AddressCurrentController {
  async update(req, res) {
    const { client } = req.params;
    const { address_id } = req.body;
    const oldAddressCurrent = await _Address2.default.findAll({
      where: { client_id: client, current_delivery: true },
    });

    // se encontrar algum endereço como corrent ele altera pra false
    if (oldAddressCurrent) {
      oldAddressCurrent.map(async a => {
        await a.update({ current_delivery: false });
      });
    }
    // se encontrar endereço e o atribui como current
    const newAddressCurrent = await _Address2.default.findByPk(address_id);

    await newAddressCurrent.update({
      current_delivery: true,
    });
    return res.json(newAddressCurrent);
  }

  async show(req, res) {
    const { client } = req.params;

    const addressCurrent = await _Address2.default.findOne({
      where: { client_id: client, current_delivery: true },
    });

    return res.json(addressCurrent);
  }
}

exports. default = new AddressCurrentController();
