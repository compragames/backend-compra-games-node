import UserController from '../../app/controllers/UserController';
import UserProviderController from '../../app/controllers/UserProviderController';

import userStoreValidator from '../../validators/UserStore';
import userUpdateValidator from '../../validators/UserUpdate';

export default (routes, auth) => {
  // Routes Public

  routes.post('/users', userStoreValidator, UserController.store);

  // Routes Private

  routes.get('/users/:id', auth, UserController.show);
  routes.put('/users/:id', auth, userUpdateValidator, UserController.update);
  routes.get('/user/provider', auth, UserProviderController.index);
  routes.get('/user/provider/:id', auth, UserProviderController.show);
  routes.post('/users/provider', auth, UserProviderController.store);
  routes.put('/user/provider/:id', auth, UserProviderController.update);
  routes.delete('/user/provider/:id', auth, UserProviderController.delete);
};
