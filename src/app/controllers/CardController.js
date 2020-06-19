import * as Yup from 'yup';
import Card from '../models/Card';

class CardController {
  async store(req, res) {
    const schema = Yup.object().shape({
      card_owner: Yup.string()
        .min(3)
        .required()
        .matches(/^(\D\D[A-z]+ \D\D[A-z ]+)$/),
      card_number: Yup.string()
        .min(5)
        .required(),
      client_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const { card_owner, card_number, year, month, client_id } = req.body;

    const cardExists = await Card.findOne({
      where: { card_number, client_id },
    });

    if (cardExists) {
      return res.status(400).json({ error: 'Card already exists!' });
    }

    const { id } = await Card.create({
      card_owner,
      card_number,
      year,
      month,
      client_id,
    });

    return res.json({ id, card_owner, card_number, year, month, client_id });
  }

  async index(req, res) {
    const { client_id } = req.params;
    const card = await Card.findAll({ where: { client_id } });
    return res.json(card);
  }
}

export default new CardController();
