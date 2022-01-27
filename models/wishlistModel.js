const productModel = require('./productModel');
const userModel = require('./userModel');

module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define('wishlist', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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

  Wishlist.associate = (models) => {
    Wishlist.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Wishlist.belongsTo(models.Product, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Wishlist;
};
