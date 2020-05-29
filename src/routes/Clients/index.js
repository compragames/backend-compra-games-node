import ClientController from '../../app/controllers/ClientController';

export default (routes, auth) => {
  // Routes Public
  routes.post('/clients', ClientController.store);

  // Routes Private
  routes.put('/clients/:id', auth, ClientController.update);
  routes.get('/clients/:id', auth, ClientController.show);
};
