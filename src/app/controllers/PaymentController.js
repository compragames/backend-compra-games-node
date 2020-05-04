import * as Yup from 'yup';
import Payment from '../models/Payment';

class PaymentController {
  async store(req, res) {

    const { 
        cardOwner,
        cardNumber, 
        dueDate           
     } = req.body;

    const { id } = await Payment.create({ 
            cardOwner,
            cardNumber, 
            dueDate            
    });

    return res.json({
        id,
        cardOwner,
        cardNumber, 
        dueDate    
    });
  }
}

export default new PaymentController();
