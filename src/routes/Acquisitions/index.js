import AcquisitionController from '../../app/controllers/AcquisitionController';

export default (routes, auth) => {
  // Routes Private
  routes.post('/acquisitions', auth, AcquisitionController.store);
};
