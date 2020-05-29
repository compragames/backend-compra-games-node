import { Router } from 'express';

import SessionController from '../app/controllers/SessionController';

// Middlewares
import authMiddleware from '../app/middleware/auth';

// Pastas das Rotas
import SalesRoute from './Sales';
import UsersRoute from './Users';
import AddressesRoute from './Addresses';
import ProductsRoute from './Products';
import ClientsRoute from './Clients';
import FilesRoute from './Files';
import CardsRoute from './Cards';
import PapersRoute from './Papers';
import PaymentsRoute from './Payments';
import FaqsRoute from './Faqs';
import StocksRoute from './Stocks';
import AcquisitionsRoute from './Acquisitions';
import PaymentStatusRoute from './PaymentStatus';

const routes = new Router();

SalesRoute(routes, authMiddleware);
UsersRoute(routes, authMiddleware);
AddressesRoute(routes, authMiddleware);
ProductsRoute(routes, authMiddleware);
ClientsRoute(routes, authMiddleware);
FilesRoute(routes, authMiddleware);
CardsRoute(routes, authMiddleware);
PapersRoute(routes, authMiddleware);
PaymentsRoute(routes, authMiddleware);
FaqsRoute(routes, authMiddleware);
StocksRoute(routes, authMiddleware);
AcquisitionsRoute(routes, authMiddleware);
PaymentStatusRoute(routes, authMiddleware);
routes.post('/sessions', SessionController.store);

export default routes;
