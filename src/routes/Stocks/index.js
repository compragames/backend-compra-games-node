import StockController from '../../app/controllers/StockController';

export default routes => {
  // Routes Public
  routes.get('/stock/:id', StockController.show);
};
