import * as Yup from 'yup';
import SaleDetail from '../models/SaleDetail';
import Sale from '../models/Sale';


class SaleDetailController {
    async store(req, res) {
        const schema = Yup.object().shape({
          amount: Yup.number()
            .required(),
          unit_price: Yup.number()
            .required(),
          freight: Yup.number()
            .required(),
        });
    
        if (!(await schema.isValid(req.body))) {
          return res.status(400).json({ error: 'validations fails' });
        }
    
        const { amount, unit_price, freight, product_id, sale_id, address_id } = req.body;
    
        // const clientExists = await Client.findOne({ where: { cpf } });
    
        // if (clientExists) {
        //   return res.status(400).json({ error: 'Client already exists' });
        // }
    
        const { id } = await SaleDetail.create({ amount, unit_price, freight, product_id, 
            sale_id, address_id });
    
        return res.json({
          id,
          amount, unit_price, freight, product_id, 
            sale_id, address_id
        });
    }

    async index(req, res) {
        const sale_detail = await SaleDetail.findAll(
            {  
                attributes: ['id', 'amount', 'unit_price', 'freight', 'product_id',
                         'sale_id', 'address_id' ],
                include:[
        //             {
        //                 model:SaleDetail, 
        //                 as: 'saledetails',
        //                 attributes: ['id', 'amount', 'unit_price', 'freight', 'product_id',
        //                  'sale_id', 'address_id'   
        //             ],
        // },
        {
            model:Sale, 
            as: 'sales',
            attributes: ['id', 'total_price', 'status', 'payment_id'],
        },
        ],
        });
        return res.json(sale_detail);    
      }
}

export default new SaleDetailController();
