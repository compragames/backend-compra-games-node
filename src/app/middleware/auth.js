import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token not provid' });
  }

  const [, token] = authorization.split(' ');

  try {
    const decode = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decode.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
