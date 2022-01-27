const subcategoryModel = require('./subcategoryModel');
const categoryModel = require('./categoryModel');
const userModel = require('./userModel');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDescription: {
      type: DataTypes.STRING(90),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    features: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    liveDemo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preview: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    screenshots: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mainZip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priceSingle: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    priceMultiple: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    // category: {
    //   type: DataTypes.UUID,
    //   references: {
    //     model: categoryModel,
    //     key: 'id',
    //   },
    // },
    // subcategory: {
    //   type: DataTypes.UUID,
    //   references: {
    //     model: subcategoryModel,
    //     key: 'id',
    //   },
    // },
    // user: {
    //   type: DataTypes.UUID,
    //   references: {
    //     model: userModel,
    //     key: 'id',
    //   },
    // },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Product.belongsTo(models.Category, {
      foreignKey: {
        allowNull: false,
      },
    });
    Product.belongsTo(models.SubCategory, {
      foreignKey: {
        allowNull: false,
      },
    });

    Product.hasMany(models.Transaction);
    Product.hasMany(models.Wishlist);
  };

  return Product;
};
