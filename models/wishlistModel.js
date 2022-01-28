const productModel = require('./productModel');
const userModel = require('./userModel');

module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define('wishlist', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    user: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    product: {
      type: DataTypes.UUID,
      references: {
        model: 'products',
        key: 'id',
      },
    },
  });

  // Wishlist.associate = (models) => {
  //   console.log('models ========' , models)
  //   Wishlist.belongsTo(models.users, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  //   Wishlist.belongsTo(models.products, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  // };

  return Wishlist;
};
