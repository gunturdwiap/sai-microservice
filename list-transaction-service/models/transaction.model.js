module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false, // default is false, but being explicit is safer
    },
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
  });
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User);
    Transaction.belongsTo(models.Product);
  };
  return Transaction;
};
