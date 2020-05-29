import RelateFaqController from '../../app/controllers/RelateFaqController';

export default (routes, auth) => {
  // Routes Private
  routes.post('/relateFaqProduct', auth, RelateFaqController.store);
  routes.delete('/faq/:id', auth, RelateFaqController.delete);
};
