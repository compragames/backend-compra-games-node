import Client from '../models/Client';

export default async (req, res, next) => {
  try {
    const { cpf } = req.body;

    const cpfIsValid = await Client.checkCpfCnpj(cpf);
    if (!cpfIsValid) {
      throw new Error("CPF doesn't valid");
    }

    const client = await Client.findOne({ where: { cpf } });
    if (client) {
      throw new Error('Client already exists');
    }
    return next();
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};
