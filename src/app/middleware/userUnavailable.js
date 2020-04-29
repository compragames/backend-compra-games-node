import User from '../models/User';

export default async (req, res, next) => {
  try {
    const { email } = req.body;
    const userUnavailable = await User.findOne({ where: { email } });
    if (userUnavailable) {
      throw new Error('User unavailable ');
    }
    return next();
  } catch (err) {
    return res.status(400).json({ erro: 'User unavailable ' });
  }
};
