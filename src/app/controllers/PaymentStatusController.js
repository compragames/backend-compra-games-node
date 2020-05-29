import PaymentStatus from '../models/PaymentStatus';

class PaymentStatusController {
  async index(req, res) {
    const paymentStatus = await PaymentStatus.findAll({
      attributes: ['id', 'status'],
    });
    return res.json(paymentStatus);
  }
}

export default new PaymentStatusController();
