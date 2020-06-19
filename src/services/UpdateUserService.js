import User from '../app/models/User';

class CreateUserService {
  async run({ userId, oldPassword, password, transaction }) {
    const user = await User.findByPk(userId);

    // if (email && email !== user.email) {
    //   const userExist = await User.findOne({ where: { email } });
    //   if (userExist) {
    //     throw new Error('User already exists');
    //   }
    // }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      throw new Error('Password does not match');
    }

    const { id, provider } = await user.update({ password }, { transaction });
    return {
      id,
      provider,
    };
  }
}

export default new CreateUserService();
