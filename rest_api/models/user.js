"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/brypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Quote);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Email is required!" },
          notNull: { msg: "Email is required!" },
          isEmail: { msg: "Must be email format" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required!" },
          notNull: { msg: "Password is required!" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user, opt) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
