import crypto from 'crypto';
import MulterGoogleCloudStorage from 'multer-google-storage';
import { extname, resolve } from 'path';

export default {
  storage: new MulterGoogleCloudStorage({
    keyFilename: resolve(__dirname, 'CompraGames-c9b2794544a8.json'),
    projectId: 'compragames',
    bucket: 'compragames',
    acl: 'publicRead',
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, resp) => {
        if (err) return cb(err);

        return cb(null, resp.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
// export default {
//   storage: multer.diskStorage({
//     destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
//     filename: (req, file, cb) => {
//       crypto.randomBytes(16, (err, resp) => {
//         if (err) return cb(err);

//         return cb(null, resp.toString('hex') + extname(file.originalname));
//       });
//     },
//   }),
// };
