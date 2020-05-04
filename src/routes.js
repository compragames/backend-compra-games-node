import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProductController from './app/controllers/ProductController';
import ProductDetailController from './app/controllers/ProductDetailController';
import RelateImageController from './app/controllers/RelateImageController';
import RelateFaqController from './app/controllers/RelateFaqController';
import AcquisitionController from './app/controllers/AcquisitionController';
import AvailableProductController from './app/controllers/AvailableProductController';
import PaperController from './app/controllers/PaperControlller';
import UserProviderController from './app/controllers/UserProviderController';
import PaperUserController from './app/controllers/PaperUserController';
import ClientController from './app/controllers/ClientController';
import AddressController from './app/controllers/AddressController';
import StockController from './app/controllers/StockController';

// Middlewares
import authMiddleware from './app/middleware/auth';
import updateStockMiddleware from './app/middleware/updateStock';
import cpfValidationMiddleware from './app/middleware/cpfValidation';
import userUnavailableMiddleware from './app/middleware/userUnavailable';

import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post(
  '/users',
  userUnavailableMiddleware,
  cpfValidationMiddleware,
  UserController.store
);
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);

routes.post('/clients', ClientController.store);
routes.put('/clients/:id', ClientController.update);
routes.get('/clients/:id', ClientController.show);
routes.post('/addresses', AddressController.store);
routes.put('/addresses/:id', AddressController.update);

routes.get('/addresses/client/:id', AddressController.show);

routes.get('/users/:id', UserController.show);
routes.get('/stock/:id', StockController.show);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);
routes.delete('/files/:id', FileController.delete);

routes.post('/products', ProductController.store);

routes.put('/products/:id', ProductController.update);

routes.get(`/products/:id/detail`, ProductDetailController.show);

// A rota de compra tem um middleware para atualizar o estoque
routes.post(
  '/acquisitions',
  updateStockMiddleware,
  AcquisitionController.store
);

routes.put('/availableProduct/:id', AvailableProductController.store);
routes.delete('/availableProduct/:id', AvailableProductController.delete);

routes.post('/relateProductImage', RelateImageController.store);
routes.post('/relateFaqProduct', RelateFaqController.store);

routes.delete('/faq/:id', RelateFaqController.delete);

routes.post('/paper', PaperController.store);
routes.get('/paper', PaperController.index);
routes.put('/paper/:id', PaperController.update);

routes.post('/paperUser', PaperUserController.store);
routes.put('/paperUser', PaperUserController.update);

routes.get('/user/provider', UserProviderController.index);
routes.get('/user/provider/:id', UserProviderController.show);
routes.post('/users/provider', UserProviderController.store);
routes.put('/user/provider/:id', UserProviderController.update);
routes.delete('/user/provider/:id', UserProviderController.delete);


routes.post('/payments', PaymentController.store);

export default routes;
