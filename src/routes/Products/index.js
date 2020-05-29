import ProductController from '../../app/controllers/ProductController';
import ProductDetailController from '../../app/controllers/ProductDetailController';
import RelateImageController from '../../app/controllers/RelateImageController';
import AvailableProductController from '../../app/controllers/AvailableProductController';

export default (routes, auth) => {
  // Routes Public

  routes.get('/products', ProductController.index);
  routes.get('/products/:id', ProductController.show);

  // Routes Private
  routes.get(`/products/:id/detail`, auth, ProductDetailController.show);
  routes.post('/products', auth, ProductController.store);
  routes.put('/products/:id', auth, ProductController.update);
  routes.post('/relateProductImage', auth, RelateImageController.store);
  routes.put('/availableProduct/:id', auth, AvailableProductController.store);
  routes.delete(
    '/availableProduct/:id',
    auth,
    AvailableProductController.delete
  );
};
