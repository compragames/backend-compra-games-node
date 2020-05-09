import Sequelize, { Model } from 'sequelize';
import Stock from './Stock';

class Acquisition extends Model {
  static init(sequelize) {
    super.init(
      {
        amount: Sequelize.INTEGER,
        price: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );
    this.addHook('afterCreate', async acquisition => {
      const stockExists = await Stock.findOne({
        where: { product_id: acquisition.product_id },
      });
      if (stockExists) {
        await stockExists.update({
          amount: Number(stockExists.amount) + Number(acquisition.amount),
        });
        return;
      }
      await Stock.create({
        product_id: acquisition.product_id,
        amount: acquisition.amount,
      });
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'acquisition',
    });
  }
}

export default Acquisition;
