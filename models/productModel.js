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
    operatingSystems: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    filesIncluded: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    supportedCms: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    htmlFrameworks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    jsFrameworks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    softwareVersions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    softwareFrameworks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    database: {
      type: DataTypes.STRING,
      allowNull: true,
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
    screenshot1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    screenshot2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    screenshot3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    screenshot4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    screenshot5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    screenshot6: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    screenshot7: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    screenshot8: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mainZip: {
      type: DataTypes.STRING,
      allowNull: true,
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
    category: {
      type: DataTypes.UUID,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    subcategory: {
      type: DataTypes.UUID,
      references: {
        model: 'subcategories',
        key: 'id',
      },
    },
    user: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    views: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    likes: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
  });

  // Product.associate = (models) => {
  //   Product.belongsTo(
  //     models.users,
  //     {
  //       foreignKey: {
  //         allowNull: false,
  //       },
  //     },
  //     { as: 'user' }
  //   );
  //   Product.belongsTo(
  //     models.categories,
  //     {
  //       foreignKey: {
  //         allowNull: false,
  //       },
  //     }
  //   );
  //   Product.belongsTo(
  //     models.subcategories,
  //     {
  //       foreignKey: {
  //         allowNull: false,
  //       },
  //     }
  //   );

  //   Product.hasMany(models.Transaction);
  //   Product.hasMany(models.Wishlist);
  // };

  return Product;
};
