"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Quote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Quote.belongsTo(models.User);
    }
  }
  Quote.init(
    {
      quote: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Quote can't be empty" },
          notNull: { msg: "Quote can't be empty" },
        },
      },
      favorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Favorite can't be empty" },
          notNull: { msg: "Favorite can't be empty" },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "UserId can't be empty" },
          notNull: { msg: "UserId can't be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "Quote",
    }
  );
  return Quote;
};
