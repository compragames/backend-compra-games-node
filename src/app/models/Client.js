import Sequelize, { Model } from 'sequelize';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static checkCpfCnpj(cpf) {
    return cpfValidator.isValid(cpf);
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'client' });
  }
}
export default Client;
