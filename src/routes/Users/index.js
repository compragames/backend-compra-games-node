import UserController from '../../app/controllers/UserController';
import UserProviderController from '../../app/controllers/UserProviderController';

import cpfValidationMiddleware from '../../app/middleware/cpfValidation';
import userUnavailableMiddleware from '../../app/middleware/userUnavailable';

export default (routes, auth) => {
  // Routes Public

  routes.post(
    '/users',
    userUnavailableMiddleware,
    cpfValidationMiddleware,
    UserController.store
  );

  // Routes Private

  routes.get('/users/:id', auth, UserController.show);
  routes.put('/users', auth, UserController.update);
  routes.get('/user/provider', auth, UserProviderController.index);
  routes.get('/user/provider/:id', auth, UserProviderController.show);
  routes.post('/users/provider', auth, UserProviderController.store);
  routes.put('/user/provider/:id', auth, UserProviderController.update);
  routes.delete('/user/provider/:id', auth, UserProviderController.delete);
};
