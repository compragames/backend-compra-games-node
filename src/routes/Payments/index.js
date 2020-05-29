import PaymentController from '../../app/controllers/PaymentController';

export default routes => {
  // Routes Public
  routes.post('/payments', PaymentController.store);
};
