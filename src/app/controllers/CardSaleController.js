import * as Yup from 'yup';
import CardSale from '../models/CardSale';
import Card from '../models/Card';
import Sale from '../models/Sale';

class CardSaleController {
  async index(req, res) {
    const card_sale = await CardSale.findAll({  include:[{model:Card, as: 'cards',
     attributes: ['id', 'card_owner', 'card_number', 'due_date', 'client_id'],
    },
    {
        model:Sale, 
        as: 'sales',
        attributes: ['id', 'total_price'],
    },
    ],
    });
    return res.json(card_sale);    
  }
}

export default new CardSaleController();
