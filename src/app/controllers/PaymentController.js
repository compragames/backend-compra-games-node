import * as Yup from 'yup';
import Payment from '../models/Payment';

class PaymentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      type: Yup.string()
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validations fails' });
    }

    const { type } = req.body;

    const { id } = await Payment.create({ type });

    return res.json({
      id,
      type,
    });
  }
}

export default new PaymentController();

