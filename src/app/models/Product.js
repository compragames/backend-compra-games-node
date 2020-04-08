import Sequelize, { Model } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        labels: Sequelize.STRING,
        plataform: Sequelize.STRING,
        available: Sequelize.BOOLEAN,
        price: Sequelize.DECIMAL,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Image, { foreignKey: 'product_id', as: 'images' });
    this.hasMany(models.Faq, { foreignKey: 'product_id', as: 'faqs' });
    this.hasOne(models.Stock, { foreignKey: 'product_id', as: 'stock' });
  }
}

export default Product;
