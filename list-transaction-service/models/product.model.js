module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false, // default is false, but being explicit is safer
    },
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
  });
  Product.associate = (models) => {
    Product.hasMany(models.Transaction);
  };
  return Product;
};
