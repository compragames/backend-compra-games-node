import AcquisitionController from '../../app/controllers/AcquisitionController';
import AcquisitionValidator from '../../validators/AcquisitionStore';

export default (routes, auth) => {
  // Routes Private
  routes.post(
    '/acquisitions',
    auth,
    AcquisitionValidator,
    AcquisitionController.store
  );
};
