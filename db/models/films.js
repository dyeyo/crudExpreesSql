"use strict";
module.exports = (sequelize, DataTypes) => {
  const Films = sequelize.define(
    "Films",
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      score: DataTypes.INTEGER,
      director: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {}
  );
  Films.associate = (models) => {
    Films.belongsTo(models.Films, {
      foreignKey: "user_id",
    });
  };
  return Films;
};
