const productModel = require('./productModel');
const userModel = require('./userModel');

module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transaction', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Failed',
    },
    // user: {
    //   type: DataTypes.UUID,
    //   references: {
    //     model: userModel,
    //     key: 'id',
    //   },
    // },
    // product: {
    //   type: DataTypes.UUID,
    //   references: {
    //     model: productModel,
    //     key: 'id',
    //   },
    // },
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Transaction.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Transaction;
};
