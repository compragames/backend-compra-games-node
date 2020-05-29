import Sequelize, { Model } from 'sequelize';

class PaymentStatus extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'payment_status',
      }
    );
    return this;
  }
}
export default PaymentStatus;
