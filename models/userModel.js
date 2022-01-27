module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[A-Za-z][A-Za-z0-9_]{5,29}$/g,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paypalEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    devloperType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    operatingSystem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    frameworks: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    devlopingExperience: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publicContact: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    income: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      validate: {
        min: 0,
        isNumeric: true,
      },
    },
    withdraw: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
      validate: {
        min: 0,
        isNumeric: true,
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Product, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    User.hasMany(models.Transaction);
    User.hasMany(models.Wishlist)
  };

  return User;
};
