import * as Yup from 'yup';
import Sale from '../models/Sale';
import SaleDetail from '../models/SaleDetail';


class SaleController {
    async store(req, res) {
        const schema = Yup.object().shape({
          total_price: Yup.number()
            .required(),
          status: Yup.string()
            .required(),
          installments: Yup.number()
          .required(),
        });
    
        if (!(await schema.isValid(req.body))) {
          return res.status(400).json({ error: 'validations fails' });
        }
    
        const { total_price, status, installments, client_id, payment_id, card_id } = req.body;
    
        // const clientExists = await Client.findOne({ where: { cpf } });
    
        // if (clientExists) {
        //   return res.status(400).json({ error: 'Client already exists' });
        // }
    
        const { id } = await Sale.create({ total_price, status, installments, client_id, payment_id, card_id });
    
        return res.json({
          id,
          total_price, status, client_id, payment_id, card_id
        });
    }

    async index(req, res) {
      const sale = await Sale.findAll(
      {  
          attributes: ['id', 'created_at', 'total_price', 'status'], 
          include: [ {model:SaleDetail, as: 'saledetails'} ]               
      },

      );
      return res.json(sale);    
    }
}

export default new SaleController();
