const categoryModel = require('./categoryModel');

module.exports = (sequelize, DataTypes) => {
  const Subcategory = sequelize.define('subcategory', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
  });

  Subcategory.associate = (models) => {
    Subcategory.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false,
      },
    });
    Subcategory.hasMany(models.Product, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  };

  return Subcategory;
};
