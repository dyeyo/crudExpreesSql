"use strict";
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING(150),
    },
    {}
  );
  Users.associate = (models) => {
    Users.hasMany(models.Films, {
      foreignKey: "user_id",
    });
  };

  return Users;
};
