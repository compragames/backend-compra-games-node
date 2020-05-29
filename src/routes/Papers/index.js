import PaperController from '../../app/controllers/PaperControlller';
import PaperUserController from '../../app/controllers/PaperUserController';

export default (routes, auth) => {
  // Routes Private
  routes.post('/paper', auth, PaperController.store);
  routes.get('/paper', auth, PaperController.index);
  routes.put('/paper/:id', auth, PaperController.update);
  routes.post('/paperUser', auth, PaperUserController.store);
  routes.put('/paperUser', auth, PaperUserController.update);
};
