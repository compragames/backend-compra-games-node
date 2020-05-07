import SalesHistoryCard from '../models/SalesHistoryCard';

class SalesHistoryCardController {
  async store(req, res) {
    const { sales_id, name, number_card, month, year } = req.body;
    const saleHistory = await SalesHistoryCard.create({
      sales_id,
      name,
      number_card,
      month,
      year,
    });
    return res.json(saleHistory);
  }
}

export default new SalesHistoryCardController();
