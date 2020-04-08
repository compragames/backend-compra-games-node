import StockController from '../controllers/StockController';

export default function(req, res, next) {
  next();

  StockController.store(req, res);
}
