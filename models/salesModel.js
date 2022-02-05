
module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('sales', {
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


  return Sales;
};
