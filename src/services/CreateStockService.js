import Stock from '../app/models/Stock';

class CreateStockService {
  async run({ product_id, amount }) {
    const stockExists = await Stock.findOne({
      where: { product_id },
    });
    // existe estoque?
    if (stockExists) {
      await stockExists.update({
        amount: Number(stockExists.amount) + Number(amount),
      });
      return;
    }
    await Stock.create({
      product_id,
      amount,
    });
  }
}

export default new CreateStockService();
