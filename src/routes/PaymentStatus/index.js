import PaymentStatusController from '../../app/controllers/PaymentStatusController';

export default (routes, auth) => {
  // Routes Private
  routes.get('/payment/status', auth, PaymentStatusController.index);
};
