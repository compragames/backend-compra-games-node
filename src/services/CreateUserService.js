import User from '../app/models/User';

class CreateUserService {
  async run({ email, password, transaction }) {
    const { id, provider } = await User.create(
      { email, password },
      { transaction }
    );
    return {
      id,
      provider,
    };
  }
}

export default new CreateUserService();
