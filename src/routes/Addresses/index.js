import AddressController from '../../app/controllers/AddressController';
import AddressCurrentController from '../../app/controllers/AddressCurrentController';

export default (routes, auth) => {
  // Routes Public
  routes.post('/addresses', AddressController.store);

  // Routes Private
  // AddressController
  routes.put('/addresses/:id', auth, AddressController.update);
  routes.get('/addresses/client/:id', auth, AddressController.index);
  routes.get('/addresses/:id', auth, AddressController.show);
  routes.delete('/addresses/:id', auth, AddressController.delete);

  // AddressCurrentController
  routes.put(
    '/addressesCurrent/client/:client',
    auth,
    AddressCurrentController.update
  );
  routes.get(
    '/addressesCurrent/client/:client',
    auth,
    AddressCurrentController.show
  );
};
