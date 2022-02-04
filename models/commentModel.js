const productModel = require('./productModel');
const userModel = require('./userModel');

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
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
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
  });


  return Comment;
};
