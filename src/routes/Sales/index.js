import SaleController from '../../app/controllers/SaleController';
import SaleAllController from '../../app/controllers/SaleAllController';
import SaleDetailController from '../../app/controllers/SaleDetailController';
import SaleStatusController from '../../app/controllers/SaleStatusController';
import validateSaleStore from '../../validators/SaleStore';

export default (routes, auth) => {
  // Routes Public
  routes.get('/saledetails/:id', SaleDetailController.index);

  // Routes Private
  routes.post('/sales', auth, validateSaleStore, SaleController.store);
  routes.get('/sales/:client_id', auth, SaleController.index);
  routes.get('/sales/:id/details', auth, SaleController.show);
  routes.get('/sales', auth, SaleAllController.index);
  routes.put(
    '/sales/:salesId/status/:statusId',
    auth,
    SaleStatusController.update
  );

  routes.get('/sales/status/:statusId', auth, SaleStatusController.index);
};
