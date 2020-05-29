import CardController from '../../app/controllers/CardController';

export default (routes, auth) => {
  // Routes Private
  routes.post('/cards', auth, CardController.store);
  routes.get('/cards/:client_id', auth, CardController.index);
};
