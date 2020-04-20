import Client from '../models/Client';

export default async (req, res, next) => {
  const { cpf } = req.body;
  const cpfIsValid = await Client.checkCpfCnpj(cpf);

  if (!cpfIsValid) {
    return res.status(400).json({ erro: "CPF doesn't valid" });
  }
  const client = await Client.findOne({ where: { cpf } });

  if (client) {
    return res.status(400).json({ erro: 'Client already exists' });
  }
  return next();
};
