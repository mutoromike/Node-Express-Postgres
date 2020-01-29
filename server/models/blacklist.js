'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blacklist = sequelize.define('Blacklist', {
    token: DataTypes.STRING
  }, {});
  Blacklist.associate = function(models) {
    // associations can be defined here
  };
  return Blacklist;
};