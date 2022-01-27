module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Category.associate = (models) => {
    Category.hasMany(models.Subcategory, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    Category.hasMany(models.Product, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  };

  return Category;
};
