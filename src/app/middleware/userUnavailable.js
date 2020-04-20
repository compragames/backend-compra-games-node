import User from '../models/User';

export default async (req, res, next) => {
  const { email } = req.body;
  const userUnavailable = await User.findOne({ where: { email } });

  if (userUnavailable) {
    return res.status(400).json({ erro: 'User unavailable ' });
  }
  return next();
};
