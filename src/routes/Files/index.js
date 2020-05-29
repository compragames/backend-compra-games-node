import multer from 'multer';

import FileController from '../../app/controllers/FileController';
import multerConfig from '../../config/multer';

export default (routes, auth) => {
  const upload = multer(multerConfig);

  // Routes Private
  routes.post('/files', auth, upload.single('file'), FileController.store);
  routes.delete('/files/:id', auth, FileController.delete);
};
