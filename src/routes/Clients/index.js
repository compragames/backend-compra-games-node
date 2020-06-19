import ClientController from '../../app/controllers/ClientController';
import userStoreValidator from '../../validators/UserStore';
import UserUpdateValidator from '../../validators/UserUpdate';
import cpfValidationMiddleware from '../../app/middleware/cpfValidation';

export default (routes, auth) => {
  // Routes Public
  routes.post(
    '/clients',
    userStoreValidator,
    cpfValidationMiddleware,
    ClientController.store
  );

  // Routes Private
  routes.put(
    '/clients/:id',
    auth,
    UserUpdateValidator,
    ClientController.update
  );
  routes.get('/clients/:id', auth, ClientController.show);
};
