"use strict";
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define(
    "Events",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Events.associate = models => {
    // associations can be defined here
    Events.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  return Events;
};
